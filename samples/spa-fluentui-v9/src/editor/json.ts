/**
 * JSON for the editor without Monaco's JSON language service (its worker and the editor features
 * it pulls in would more than double the editor's download): a Monarch tokenizer for the colours,
 * and `jsonc-parser` (a few kB) for validation and formatting.
 */
import { format, parse, printParseErrorCode, type ParseError } from "jsonc-parser";
import type { languages } from "monaco-editor/editor";
import type { EditorProblem } from "./types";

export const JSON_LANGUAGE: languages.IMonarchLanguage = {
  defaultToken: "invalid",
  tokenPostfix: ".json",
  tokenizer: {
    root: [
      [/\s+/, ""],
      [/"(?:[^"\\]|\\.)*"(?=\s*:)/, "string.key"],
      [/"(?:[^"\\]|\\.)*"/, "string.value"],
      [/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/, "number"],
      [/\b(?:true|false|null)\b/, "keyword"],
      [/[{}[\]]/, "delimiter.bracket"],
      [/[,:]/, "delimiter"],
    ],
  },
};

export const JSON_CONFIGURATION: languages.LanguageConfiguration = {
  brackets: [
    ["{", "}"],
    ["[", "]"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}", notIn: ["string"] },
    { open: "[", close: "]", notIn: ["string"] },
    { open: '"', close: '"', notIn: ["string"] },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: '"', close: '"' },
  ],
};

const MESSAGES: Record<string, string> = {
  InvalidSymbol: "Unexpected character.",
  InvalidNumberFormat: "Invalid number.",
  PropertyNameExpected: "Expected a property name in double quotes.",
  ValueExpected: "Expected a value.",
  ColonExpected: "Expected a colon.",
  CommaExpected: "Expected a comma.",
  CloseBraceExpected: "Expected a closing brace.",
  CloseBracketExpected: "Expected a closing bracket.",
  EndOfFileExpected: "Expected the end of the JSON.",
  InvalidCommentToken: "JSON has no comments.",
  UnexpectedEndOfComment: "JSON has no comments.",
  UnexpectedEndOfString: "The string isn't closed.",
  UnexpectedEndOfNumber: "The number is incomplete.",
  InvalidUnicode: "Invalid Unicode escape.",
  InvalidEscapeCharacter: "Invalid escape character.",
  InvalidCharacter: "Invalid character in a string.",
};

/** The position (1-based line and column) of an offset in `text`. */
export function positionAt(text: string, offset: number): { line: number; column: number } {
  const before = text.slice(0, offset);
  const lineStart = before.lastIndexOf("\n") + 1;
  return { line: before.split("\n").length, column: offset - lineStart + 1 };
}

export interface JsonProblem extends EditorProblem {
  offset: number;
  length: number;
}

/** What is wrong with `text` as strict JSON (no comments, no trailing commas); none when empty. */
export function jsonProblems(text: string): JsonProblem[] {
  const errors: ParseError[] = [];
  parse(text, errors, {
    disallowComments: true,
    allowTrailingComma: false,
    allowEmptyContent: true,
  });
  return errors.map((e) => {
    const code = printParseErrorCode(e.error);
    return {
      ...positionAt(text, e.offset),
      offset: e.offset,
      length: e.length,
      message: MESSAGES[code] ?? code,
    };
  });
}

/** The edits that indent `text` with two spaces, as offsets into it. */
export function jsonFormatEdits(text: string) {
  return format(text, undefined, { tabSize: 2, insertSpaces: true, eol: "\n" });
}
