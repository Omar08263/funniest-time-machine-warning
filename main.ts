// Funniest Time Machine Warning Label — program/v1 entry.
// Writes one warning label (<=120 chars) to /output/entry.txt.
// Deterministic: no network, no randomness, no environment reads.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LABEL =
  "WARNING: Do not kill your grandfather. He is the only one who knows how to drive this thing home.";

function main(): void {
  const bytes = Buffer.byteLength(LABEL, "utf8");
  if (LABEL.length < 1 || LABEL.length > 120) {
    throw new Error(`label is ${LABEL.length} chars, must be 1-120`);
  }
  if (bytes > 120) {
    throw new Error(`label is ${bytes} bytes, must fit 120 bytes`);
  }
  if (LABEL.trim().length === 0) {
    throw new Error("label must not be only whitespace");
  }
  if (/[\r\n]/.test(LABEL)) {
    throw new Error("label must be a single line with no line breaks");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LABEL, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== LABEL) {
    throw new Error("read-back mismatch: entry.txt differs from LABEL");
  }
  console.log(`wrote ${LABEL.length} chars (${bytes} bytes) to /output/entry.txt`);
}

main();
