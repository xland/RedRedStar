import { defineConfig } from "oxlint";
import solidV2 from "eslint-plugin-solid/configs/v2";

export default defineConfig({
  jsPlugins: ["eslint-plugin-solid"],
  ignorePatterns: ["**/*.gen.ts", "dist"],
  settings: solidV2.settings,
  rules: solidV2.rules,
});
