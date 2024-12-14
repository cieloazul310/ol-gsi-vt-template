import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

/** @type {import("eslint").Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
];
