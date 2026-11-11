/**
 * The code editor's pure parts: the Fluent-derived themes, JSON validation and formatting, and how
 * a code block's language is told.
 */
import { applyEdits } from "jsonc-parser";
import { describe, expect, it } from "vitest";
import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { jsonFormatEdits, jsonProblems, positionAt } from "../../src/editor/json";
import { editorTheme, hexColor, withAlpha } from "../../src/editor/theme";
import { detectLanguage, editorHeight, lineCount } from "../../src/editor/types";

describe("editor theme", () => {
  it("turns Fluent colours into the hex colours Monaco takes", () => {
    expect(hexColor("#0F6CBD")).toBe("#0f6cbd");
    expect(hexColor("#fff")).toBe("#ffffff");
    expect(hexColor("transparent")).toBe("#00000000");
    expect(hexColor("rgba(0, 0, 0, 0.4)")).toBe("#00000066");
    expect(hexColor("rgb(255,255,255)")).toBe("#ffffff");
    expect(withAlpha("#0f6cbd", 0.25)).toBe("#0f6cbd40");
    expect(() => hexColor("Canvas")).toThrow();
  });

  it.each([
    ["light", webLightTheme, "vs"],
    ["dark", webDarkTheme, "vs-dark"],
    ["high contrast", teamsHighContrastTheme, "hc-black"],
  ] as const)("makes a valid %s theme from the Fluent tokens", (_, fluent, base) => {
    const theme = editorTheme(fluent, base);
    expect(theme.base).toBe(base);
    for (const value of Object.values(theme.colors))
      expect(value).toMatch(/^#[0-9a-f]{6}([0-9a-f]{2})?$/);
    for (const rule of theme.rules) {
      if (rule.foreground) expect(rule.foreground).toMatch(/^[0-9a-f]{6}$/);
    }
    // The text and the keywords are Fluent's foreground colours; the background is the page's.
    expect(theme.colors["editor.foreground"]).toBe(hexColor(fluent.colorNeutralForeground1));
    expect(theme.rules.find((r) => r.token === "keyword")?.foreground).toBe(
      hexColor(fluent.colorBrandForeground1).slice(1)
    );
    expect(theme.colors["editor.background"]).toBe("#00000000");
    expect("contrastBorder" in theme.colors).toBe(base === "hc-black");
  });
});

describe("JSON in the editor", () => {
  it("finds no problem in valid or empty JSON", () => {
    expect(jsonProblems('{ "name": "Contoso", "n": [1, 2.5e3, true, null] }')).toEqual([]);
    expect(jsonProblems("")).toEqual([]);
    expect(jsonProblems("  \n")).toEqual([]);
  });

  it("says what is wrong, and where", () => {
    const text = '{\n  "name": "Contoso"\n  "city": "Redmond"\n}';
    expect(jsonProblems(text)).toEqual([
      { line: 3, column: 3, offset: 24, length: 6, message: "Expected a comma." },
    ]);
    expect(jsonProblems('{ "a": 1, }')[0]?.message).toBe(
      "Expected a property name in double quotes."
    );
    expect(jsonProblems('{ "a": 1 } // note')[0]?.message).toBe("JSON has no comments.");
    expect(jsonProblems('{ "a": "b')[0]?.message).toBe("The string isn't closed.");
  });

  it("finds the line and column of an offset", () => {
    expect(positionAt("ab\ncd", 0)).toEqual({ line: 1, column: 1 });
    expect(positionAt("ab\ncd", 4)).toEqual({ line: 2, column: 2 });
  });

  it("indents JSON with two spaces", () => {
    const text = '{"name":"Contoso","tags":["a","b"]}';
    expect(applyEdits(text, jsonFormatEdits(text))).toBe(
      '{\n  "name": "Contoso",\n  "tags": [\n    "a",\n    "b"\n  ]\n}'
    );
  });
});

describe("code block language", () => {
  it("is TypeScript unless the code is plain", () => {
    expect(detectLanguage("const a = 1;")).toBe("typescript");
    expect(detectLanguage('{ "a": 1 }', true)).toBe("json");
    expect(detectLanguage("[1, 2]", true)).toBe("json");
    expect(detectLanguage("{ not json", true)).toBe("plaintext");
    expect(
      detectLanguage(
        "GET https://contoso.crm.dynamics.com/api/data/v9.2/accounts\naccept: */*",
        true
      )
    ).toBe("http");
    expect(detectLanguage("Error: boom\n    at x (y.js:1:2)", true)).toBe("plaintext");
  });

  it("sizes the loading placeholder like the editor", () => {
    expect(lineCount("a\nb\nc")).toBe(3);
    expect(editorHeight(3)).toBe(3 * 20 + 2 * 8);
  });
});
