// Replaced at build time (tsup `define`) and in tests (vitest `define`) with package.json's version.
declare const __SDK_VERSION__: string | undefined;

/** The version of `@mohsinonxrm/dataverse-sdk-core`, as sent in `x-ms-sdk-version`. */
export const SDK_VERSION: string =
  typeof __SDK_VERSION__ === "string" ? __SDK_VERSION__ : "0.0.0-dev";
