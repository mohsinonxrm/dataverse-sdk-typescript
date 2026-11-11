import type { languages } from "monaco-editor/editor";

/**
 * A small language for the request previews (`httpText` in explorer/preview.ts): the request line,
 * `Name: value` headers, and after the blank line a JSON body.
 */
export const HTTP_LANGUAGE: languages.IMonarchLanguage = {
  defaultToken: "",
  tokenizer: {
    root: [[/([A-Z]+)( +)(\S+)/, ["keyword.http", "", { token: "string", next: "@headers" }]]],
    headers: [
      [/^$/, { token: "", next: "@body", nextEmbedded: "json" }],
      [/([^:\s]+)(:)(.*)/, ["attribute.name.http", "delimiter", "attribute.value.http"]],
    ],
    // The rest is JSON (the embedded language never ends).
    body: [[/(?!)/, { token: "", nextEmbedded: "@pop" }]],
  },
};
