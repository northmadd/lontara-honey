import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const apiSource = new URL('../public/api/', import.meta.url);
const apiDestination = new URL('../dist/api/', import.meta.url);

if (existsSync(apiSource)) {
  await mkdir(apiDestination, { recursive: true });
  await cp(apiSource, apiDestination, { recursive: true });
}
