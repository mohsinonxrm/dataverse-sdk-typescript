/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: { es2022: true, browser: true, node: true },
  ignorePatterns: ["dist/**", "node_modules/**", "**/*.d.ts"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
  },
};
