export function mountContactForm(form, {
  fetchImpl = (...args) => fetch(...args),
  endpoint = 'https://admin.noveraflow.com/api/public/site-contact',
  i18n = window.NoveraFlowI18n,
  makeKey = () => crypto.randomUUID(),
  eventTarget = window
} = {}) {
  const fields = form.elements;
  const button = form.querySelector('[type="submit"]');
  const status = form.querySelector('[role="status"]');
  const details = form.querySelector('fieldset');
  let sending = false, state = '', key = '', lastPayload = '';
  const render = () => {
    button.textContent = i18n.message(sending ? 'contact.form.sending' : 'contact.form.submit');
    status.textContent = state ? i18n.message(`contact.form.${state}`) : '';
  };
  const updateDetails = () => {
    const applicable = ['feature', 'bug'].includes(fields.type.value);
    details.hidden = !applicable; details.disabled = !applicable;
  };
  fields.type.addEventListener('change', updateDetails);
  eventTarget.addEventListener('noveraflow:localechange', render);
  updateDetails(); button.disabled = false;
  const submit = async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const payload = Object.fromEntries(['type', 'email', 'subject', 'message', 'name', 'website'].map(name => [name, fields[name].value.trim()]));
    if (['feature', 'bug'].includes(payload.type)) {
      payload.platform = fields.platform.value; payload.appVersion = fields.appVersion.value.trim();
    }
    payload.locale = i18n.locale;
    const serialized = JSON.stringify(payload);
    if (serialized !== lastPayload || !key) { key = makeKey(); lastPayload = serialized; }
    sending = true; button.disabled = true; state = 'sending'; form.setAttribute('aria-busy', 'true');
    form.querySelectorAll('input, select, textarea').forEach(field => { field.disabled = true; }); render();
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetchImpl(endpoint, {
        method: 'POST', credentials: 'omit', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: serialized
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true || result.status !== 'accepted') {
        state = response.status === 429 ? 'limited' : result.error === 'delivery_unconfirmed' ? 'unconfirmed' : 'failed';
      } else {
        state = 'success'; form.reset(); updateDetails(); key = ''; lastPayload = '';
      }
    } catch { state = 'unconfirmed'; }
    finally {
      clearTimeout(timer); sending = false; button.disabled = false;
      form.querySelectorAll('input, select, textarea').forEach(field => { field.disabled = false; });
      updateDetails(); form.setAttribute('aria-busy', 'false'); render();
    }
  };
  form.addEventListener('submit', submit); render();
  return { submit };
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('site-contact');
  if (form) mountContactForm(form);
}
