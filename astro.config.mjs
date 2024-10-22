// @ts-check
import { defineConfig } from "astro/config";
import viteConfig from "./vite.config.js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    format: "file",
    assets: "assets",
  },
  vite: viteConfig,
});
