/**
 * The editor's props, languages and sizes, apart from the editor itself, so the components that
 * lazily load it can use them without loading Monaco.
 */
import { webLightTheme } from "@fluentui/react-components";

export type EditorLanguage = "typescript" | "json" | "http" | "shell" | "csharp" | "plaintext";

/** A validation problem in the editor's text (1-based line and column). */
export interface EditorProblem {
  line: number;
  column: number;
  message: string;
}

/** What the editor offers its parent once it is created. */
export interface EditorApi {
  /** Formats the whole text (Shift+Alt+F in the editor). */
  format: () => void;
  focus: () => void;
}

export interface CodeEditorProps {
  value: string;
  language: EditorLanguage;
  /** The editor's accessible name. */
  label: string;
  readOnly?: boolean;
  wordWrap?: boolean;
  /** The editor grows with its content between these many lines. */
  minLines?: number;
  maxLines?: number;
  placeholder?: string;
  /** The id of the element that describes the editor (a field's hint or error). */
  describedBy?: string;
  invalid?: boolean;
  onChange?: (value: string) => void;
  onProblems?: (problems: EditorProblem[]) => void;
  onReady?: (api: EditorApi) => void;
}

/** The Fluent type ramp and spacing the editor uses, in pixels (Monaco takes numbers). */
export const FONT_SIZE = parseInt(webLightTheme.fontSizeBase200, 10);
export const LINE_HEIGHT = parseInt(webLightTheme.lineHeightBase300, 10);
export const PADDING = parseInt(webLightTheme.spacingVerticalS, 10);

/** The height of an editor showing `lines` lines, so the loading skeleton takes the same room. */
export function editorHeight(lines: number): number {
  return lines * LINE_HEIGHT + 2 * PADDING;
}

export function lineCount(text: string): number {
  return text.split("\n").length;
}

const REQUEST_LINE = /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) \S+/;

/**
 * The language of a code block: TypeScript unless it is `plain`, and then JSON when it parses as
 * an object or array, an HTTP request when it starts with a request line, or plain text.
 */
export function detectLanguage(code: string, plain = false): EditorLanguage {
  if (!plain) return "typescript";
  const text = code.trim();
  if (text.startsWith("{") || text.startsWith("[")) {
    try {
      JSON.parse(text);
      return "json";
    } catch {
      return "plaintext";
    }
  }
  return REQUEST_LINE.test(text) ? "http" : "plaintext";
}
