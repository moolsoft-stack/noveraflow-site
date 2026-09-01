import test from 'node:test';

import { verifySite } from '../scripts/verify-site.mjs';

test('account deletion and privacy production candidate is structurally complete', async () => {
  await verifySite();
});
