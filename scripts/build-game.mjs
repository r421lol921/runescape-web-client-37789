// Build script: compiles the OSRS TypeScript game client into public/game.js
// Uses esbuild with a custom plugin to replace Parcel glob imports with /cache/ fetch URLs.

import * as esbuild from "esbuild";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Cache files that will be served from /cache/
const CACHE_FILE = "main_file_cache.dat";
const CACHE_INDICES = [
  "main_file_cache.idx0",
  "main_file_cache.idx1",
  "main_file_cache.idx2",
  "main_file_cache.idx3",
  "main_file_cache.idx4",
];

// esbuild plugin: intercept Parcel-style glob imports from client_cache/
const cacheGlobPlugin = {
  name: "cache-glob",
  setup(build) {
    // Match: import cacheData from "./../client_cache/*.dat"
    build.onResolve({ filter: /client_cache\/\*\.dat/ }, (args) => {
      return { path: "cache-dat-virtual", namespace: "cache-glob" };
    });

    // Match: import cacheIndices from "./../client_cache/*.idx*"
    build.onResolve({ filter: /client_cache\/\*\.idx/ }, (args) => {
      return { path: "cache-idx-virtual", namespace: "cache-glob" };
    });

    // Parcel glob import for *.dat returns an object keyed by filename stem.
    // e.g. cacheData.main_file_cache === "/cache/main_file_cache.dat"
    build.onLoad({ filter: /cache-dat-virtual/, namespace: "cache-glob" }, () => {
      const stem = CACHE_FILE.replace(/\.dat$/, "");
      return {
        contents: `export default { "${stem}": "/cache/${CACHE_FILE}" };`,
        loader: "js",
      };
    });

    // Parcel glob import for *.idx* returns an object keyed by filename stem,
    // each value is an array of matching URLs.
    // e.g. cacheIndices.main_file_cache[0] === "/cache/main_file_cache.idx0"
    build.onLoad({ filter: /cache-idx-virtual/, namespace: "cache-glob" }, () => {
      const stem = "main_file_cache";
      const urls = CACHE_INDICES.map((f) => `"/cache/${f}"`).join(", ");
      return {
        contents: `export default { "${stem}": [${urls}] };`,
        loader: "js",
      };
    });
  },
};

// Entry point — create a minimal bootstrap that wires up the canvas and starts the game
const entryContent = `
import { Game } from "./osrs/Game";

const canvas = document.getElementById("game-canvas");
canvas.width = 765;
canvas.height = 503;
canvas.focus();

const game = new Game(canvas);
game.initializeApplication(765, 503);
`;

const entryPath = path.join(root, "scripts", "_game_entry.ts");
fs.writeFileSync(entryPath, entryContent);

console.log("Building game bundle...");

try {
  await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    outfile: path.join(root, "public", "game.js"),
    platform: "browser",
    target: ["es2020"],
    format: "iife",
    plugins: [cacheGlobPlugin],
    tsconfig: path.join(root, "tsconfig.json"),
    define: {
      "module.hot": "undefined",
    },
    logLevel: "info",
  });

  console.log("Game bundle built successfully -> public/game.js");
} catch (err) {
  console.error("Build failed:", err.message);
  process.exit(1);
} finally {
  // Clean up temp entry file
  fs.unlinkSync(entryPath);
}
