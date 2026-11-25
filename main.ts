import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. Waited an hour for a table, got my weekend served cold, and the waiter was Monday. He never even apologised.";

// Gate: the entry must be 1-180 chars and at most 25 words, one line, no em dash.
const words = LINE.trim().split(/\s+/);
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-180`);
}
if (words.length > 25) {
  throw new Error(`entry is ${words.length} words, must be at most 25`);
}
if (LINE.includes("\u2014") || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no em dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
