// Warning Label for Humans — a make.fun program/v1 entry.
//
// The whole entry is one line: the safety warning label that should come
// printed on every human being. The program writes it, unchanged, to
// entry.txt in the harness output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label in its three printed parts: the regulatory header, the finding
// of fact, and the closer the whole line turns on.
const HEADER = "WARNING: Contents may ignore this label.";
const FINDING =
  "Unit has already decided the wet paint is dry, the stove is not that hot,";
const CLOSER = "and the instructions are for other people.";

const LABEL = [HEADER, FINDING, CLOSER].join(" ");

// The gate only judges a single line of 1 to 160 characters, so refuse to
// write anything else: a label that breaks its own gate warns no one.
if (LABEL.length < 1 || LABEL.length > 160 || LABEL.includes("\n")) {
  throw new Error(`label breaks the gate: ${LABEL.length} characters`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LABEL, "utf8");
