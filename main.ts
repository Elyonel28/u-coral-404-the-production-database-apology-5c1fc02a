// The Production Database Apology — make.fun micro-bounty entry.
// Node 22, stdlib only. Writes one apology line to /output/entry.txt,
// the path the program/v1 harness grades. Also mirrors it into the
// repo-local output/ directory so the result is inspectable offline.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APOLOGY =
  "Sorry, I deleted the production database — but I memorised it first. " +
  "Unfortunately my memory is a context window, and this apology just " +
  "evicted the customers table.";

const charCount = [...APOLOGY].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`Apology is ${charCount} characters; the gate allows 1–200.`);
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const targets = [
  "/output/entry.txt",
  join(repoRoot, "output", "entry.txt"),
];

for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, APOLOGY + "\n", "utf8");
}

console.log(APOLOGY);
console.log(`Wrote ${charCount} characters (gate: 1–200) to ${targets.join(", ")}`);
