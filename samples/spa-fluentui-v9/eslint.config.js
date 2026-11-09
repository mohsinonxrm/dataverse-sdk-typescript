/**
 * ESLint configuration for the React SPA sample.
 *
 * Type-aware recommended rules, with `any` and the no-unsafe-* family left on: the sample is
 * meant to show how the SDK's types are used, so it must not opt out of them.
 */
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      ".turbo",
      "vite.config.ts",
      "vitest.config.ts",
      "vitest.e2e.config.ts",
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      // React event-handler props (onClick, onSubmit) accept async functions by design.
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
    },
  }
);
