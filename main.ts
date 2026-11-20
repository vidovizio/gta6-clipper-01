import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(botDir, "VIDEO.json");
const dest = join(outputDir, "VIDEO.json");

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(src, dest);
  const srcSize = statSync(src).size;
  const destSize = statSync(dest).size;
  if (srcSize !== destSize) {
    console.error(
      `ERROR: copy verification failed: ${src} is ${srcSize} bytes but ${dest} is ${destSize} bytes`,
    );
    process.exit(1);
  }
  console.log(`Copied ${src} -> ${dest} (${destSize} bytes, size verified)`);
} catch (err) {
  console.error(
    `ERROR: failed to copy VIDEO.json from ${src} to ${dest}: ${
      err instanceof Error ? err.message : String(err)
    }`,
  );
  process.exit(1);
}
