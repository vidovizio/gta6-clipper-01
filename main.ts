import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(botDir, "VIDEO.json");
const dest = join(outputDir, "VIDEO.json");

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
} catch (err) {
  console.error(
    `ERROR: failed to copy VIDEO.json from ${src} to ${dest}: ${
      err instanceof Error ? err.message : String(err)
    }`,
  );
  process.exit(1);
}
