// Entry program for gta6-meme-x-01 (Node 22, standard library only).
// The post on X is the entry; this program only carries its address to the
// grader. It reads POST.json out of the bot directory, checks it parses as
// JSON, and writes the same bytes into the output directory.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = join(botDir, 'POST.json');
let raw: Buffer;
try {
  raw = readFileSync(postPath);
} catch (err) {
  console.error(`POST.json could not be read from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
try {
  JSON.parse(raw.toString('utf8')); // fail loudly if the address file is not JSON
} catch {
  console.error(`POST.json in ${botDir} is not valid JSON`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'POST.json'), raw);
