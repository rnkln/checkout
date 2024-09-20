import u from 'url';
import p from 'path';
import fs from 'fs';

const __filename = u.fileURLToPath(import.meta.url);
const __dirname = p.dirname(__filename);

const env = {
  NEXT_PUBLIC_PAYMENTS_API_ENDPOINT: 'http://localhost:3001',
  NEXT_PUBLIC_VAULT_API_ENDPOINT: 'http://localhost:3001/api/vault',
};

const envFile = p.resolve(__dirname, '..', '.env.local');
const envLocal = Object.entries(env)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFile(envFile, envLocal, (err) => {
  if (err) throw err;
});