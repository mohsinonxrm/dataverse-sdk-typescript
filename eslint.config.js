import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/generated/**",
      "**/*.config.js",
      "**/*.config.ts",
      "**/*.config.mjs",
      // Auto-generated SDK files
      "packages/dataverse-sdk-actions/src/**/*.ts",
      "packages/dataverse-sdk-functions/src/**/*.ts",
      "packages/dataverse-sdk-messages/src/**/*.ts",
      "packages/dataverse-sdk-metadata/src/types/**/*.ts",
      "packages/dataverse-sdk-metadata/src/types/index.ts",
      // Exclude index files that are auto-generated barrel exports
      "packages/dataverse-sdk-actions/src/index.ts",
      "packages/dataverse-sdk-functions/src/index.ts",
      "packages/dataverse-sdk-messages/src/index.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce no 'any' in public APIs
      "@typescript-eslint/no-explicit-any": "error",

      // Require await in async functions
      "@typescript-eslint/require-await": "error",

      // Prevent floating promises
      "@typescript-eslint/no-floating-promises": "error",

      // Prevent misused promises
      "@typescript-eslint/no-misused-promises": "error",

      // Stylistic preferences
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

      // Allow console (we use it for default logger)
      "no-console": "off",

      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Relax some strict rules for practical development
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },
  {
    files: ["**/*.test.ts", "**/test/**/*.ts"],
    rules: {
      // Relax rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  }
);
