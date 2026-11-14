/**
 * The Monaco editor as the site bundles it: no CDN, and only what the explorer uses.
 *
 * - The core editor and the features for reading and editing code: folding, find, copy (and the
 *   context menu), bracket matching, formatting, word navigation. Not hovers: a JSON body's
 *   problems are shown by its field.
 * - Six languages: TypeScript (Monaco's syntax highlighting; no TypeScript language service),
 *   JSON (json.ts: highlighting, validation and formatting without Monaco's JSON worker), an HTTP
 *   request language (http.ts), shell and C# (Monaco's highlighting, for the explorer's "Copy
 *   as" curl and HttpClient code), and plain text. None of Monaco's other languages are bundled.
 * - The editor's worker is built by Vite and served from the site, and `MonacoEnvironment`
 *   hands it to Monaco, so Monaco never starts a `blob:` worker: the site's
 *   Content-Security-Policy stays `'self'` for scripts and workers, without `unsafe-eval`.
 *
 * This module is imported only by the lazily loaded editor component, so the editor downloads the
 * first time a code view renders, not with the app.
 */
import * as monaco from "monaco-editor/editor";
import "monaco-editor/features/bracketMatching/register";
import "monaco-editor/features/clipboard/register";
import "monaco-editor/features/codicon/register";
import "monaco-editor/features/contextmenu/register";
import "monaco-editor/features/find/register";
import "monaco-editor/features/folding/register";
import "monaco-editor/features/format/register";
import "monaco-editor/features/placeholderText/register";
import "monaco-editor/features/readOnlyMessage/register";
import "monaco-editor/features/wordOperations/register";
import "monaco-editor/languages/definitions/csharp/register";
import "monaco-editor/languages/definitions/shell/register";
import "monaco-editor/languages/definitions/typescript/register";
import EditorWorker from "monaco-editor/editor/editor.worker?worker";
import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { HTTP_LANGUAGE } from "./http";
import { JSON_CONFIGURATION, JSON_LANGUAGE, jsonFormatEdits } from "./json";
import { editorTheme, type EditorThemeName } from "./theme";

(globalThis as { MonacoEnvironment?: monaco.Environment }).MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
};

monaco.languages.register({ id: "json", aliases: ["JSON"], mimetypes: ["application/json"] });
monaco.languages.setMonarchTokensProvider("json", JSON_LANGUAGE);
monaco.languages.setLanguageConfiguration("json", JSON_CONFIGURATION);
monaco.languages.registerDocumentFormattingEditProvider("json", {
  displayName: "JSON",
  provideDocumentFormattingEdits: (model) =>
    jsonFormatEdits(model.getValue()).map((edit) => {
      const start = model.getPositionAt(edit.offset);
      const end = model.getPositionAt(edit.offset + edit.length);
      return {
        range: new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
        text: edit.content,
      };
    }),
});

monaco.languages.register({ id: "http" });
monaco.languages.setMonarchTokensProvider("http", HTTP_LANGUAGE);

const THEMES: Record<EditorThemeName, monaco.editor.IStandaloneThemeData> = {
  "fluent-light": editorTheme(webLightTheme, "vs"),
  "fluent-dark": editorTheme(webDarkTheme, "vs-dark"),
  "fluent-high-contrast": editorTheme(teamsHighContrastTheme, "hc-black"),
};
for (const [name, data] of Object.entries(THEMES)) monaco.editor.defineTheme(name, data);

export { monaco };
