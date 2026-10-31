// Separate, identity-free counters. Never proxy auth or records through Pages.
const events = new Set(['store_android', 'store_ios', 'web_start', 'record_created']);
const languages = new Set(['en', 'ko', 'ja', 'unknown']);
const sources = new Set(['direct', 'google', 'bing', 'chatgpt', 'social', 'internal', 'other', 'unknown']);
const headers = {'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff'};
export async function conversionResponse(request, env) {
  const url = new URL(request.url);
  if (url.search) return new Response(null, {status: 400, headers});
  if (request.method === 'GET') return Response.json({enabled: !!env.NF_CONVERSIONS, version: 1}, {headers});
  if (request.method !== 'POST') return new Response(null, {status: 405, headers});
  if (request.headers.get('Origin') !== url.origin || request.headers.has('Authorization')) return new Response(null, {status: 403, headers});
  if (request.headers.get('Sec-GPC') === '1' || request.headers.get('DNT') === '1') return new Response(null, {status: 204, headers});
  if (!request.headers.get('Content-Type')?.startsWith('application/json') || !request.body) return new Response(null, {status: 400, headers});
  const reader = request.body.getReader();
  const chunks = []; let length = 0;
  while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    length += value.length;
    if (length > 512) { await reader.cancel(); return new Response(null, {status: 413, headers}); }
    chunks.push(value);
  }
  let body;
  try {
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    body = JSON.parse(new TextDecoder().decode(bytes));
  } catch { return new Response(null, {status: 400, headers}); }
  if (!body || typeof body !== 'object' || Array.isArray(body) ||
      Object.keys(body).sort().join(',') !== 'consent,event,language,scope,source,traffic' ||
      body.consent !== 'granted_v1' || !events.has(body.event) || !languages.has(body.language) || !sources.has(body.source) ||
      !['production', 'test'].includes(body.traffic) || body.scope !== (body.event === 'record_created' ? 'first_ack_in_page' : 'click')) {
    return new Response(null, {status: 400, headers});
  }
  if (!env.NF_CONVERSIONS) return new Response(null, {status: 503, headers});
  const rawCountry = request.cf?.country;
  const country = ['US', 'KR', 'JP'].includes(rawCountry) ? rawCountry : /^[A-Z]{2}$/.test(rawCountry || '') && rawCountry !== 'XX' ? 'other' : 'unknown';
  try {
    env.NF_CONVERSIONS.writeDataPoint({
      // Bounded, shared categories preserve small subgroups when WAE samples.
      // No visitor, account, record or event identifier is generated or stored.
      indexes: [['v1', body.event, body.language, country, body.source, body.scope, body.traffic].join('|')],
      blobs: [body.event, body.language, country, body.source, body.scope, body.traffic],
      doubles: [1],
    });
    return new Response(null, {status: 204, headers});
  } catch { return new Response(null, {status: 503, headers}); }
}
