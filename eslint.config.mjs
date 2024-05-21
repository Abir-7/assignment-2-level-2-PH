import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-var": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "error",
    },
    ignores: ["**/node_modules/", ".dist/"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
