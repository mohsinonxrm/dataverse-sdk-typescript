/**
 * Monaco themes made from Fluent 2 theme tokens, so code looks like the rest of the app in the
 * light, dark and high-contrast themes. Pure functions (no Monaco import), so they can be tested
 * in Node.
 */
import type { Theme } from "@fluentui/react-components";
import type { editor } from "monaco-editor/editor";

export type EditorThemeName = "fluent-light" | "fluent-dark" | "fluent-high-contrast";

/** A Fluent colour as Monaco takes it: `#rrggbb` or `#rrggbbaa`. */
export function hexColor(value: string): string {
  const v = value.trim().toLowerCase();
  if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/.test(v)) return v;
  if (/^#[0-9a-f]{3,4}$/.test(v)) return `#${[...v.slice(1)].map((c) => c + c).join("")}`;
  if (v === "transparent") return "#00000000";
  const rgba = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(v);
  if (rgba) {
    const [, r = "0", g = "0", b = "0", a] = rgba;
    const byte = (n: number) =>
      Math.round(Math.min(255, Math.max(0, n)))
        .toString(16)
        .padStart(2, "0");
    const alpha = a === undefined ? "" : byte(Number(a) * 255);
    return `#${byte(Number(r))}${byte(Number(g))}${byte(Number(b))}${alpha}`;
  }
  throw new Error(`Not a colour the editor theme can use: ${value}`);
}

/** `#rrggbb` with an alpha channel (0 to 1). */
export function withAlpha(value: string, alpha: number): string {
  return `${hexColor(value).slice(0, 7)}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

/**
 * The editor theme for a Fluent theme. The editor's background is transparent: the component
 * around it paints the background with Fluent tokens (a code block and an input differ), and the
 * accessibility checks see the real background colour behind the text.
 */
export function editorTheme(theme: Theme, base: editor.BuiltinTheme): editor.IStandaloneThemeData {
  const c = (token: keyof Theme) => hexColor(String(theme[token]));
  // Token colours are written without the `#`.
  const fg = (token: keyof Theme) => c(token).slice(1, 7);
  const highContrast = base === "hc-black" || base === "hc-light";
  const accent = c("colorBrandForeground1");
  return {
    base,
    inherit: true,
    rules: [
      { token: "", foreground: fg("colorNeutralForeground1") },
      { token: "comment", foreground: fg("colorNeutralForeground3"), fontStyle: "italic" },
      {
        token: "keyword",
        foreground: fg("colorBrandForeground1"),
        fontStyle: highContrast ? "bold" : "",
      },
      { token: "string", foreground: fg("colorPaletteGreenForeground1") },
      { token: "string.escape", foreground: fg("colorPaletteDarkOrangeForeground1") },
      { token: "regexp", foreground: fg("colorPaletteDarkOrangeForeground1") },
      { token: "number", foreground: fg("colorPaletteBerryForeground1") },
      { token: "type.identifier", foreground: fg("colorPaletteTealForeground2") },
      { token: "delimiter", foreground: fg("colorNeutralForeground2") },
      // JSON
      { token: "string.key.json", foreground: fg("colorBrandForeground2") },
      { token: "string.value.json", foreground: fg("colorPaletteGreenForeground1") },
      { token: "keyword.json", foreground: fg("colorPaletteBerryForeground1") },
      // HTTP messages (see http.ts)
      { token: "keyword.http", foreground: fg("colorBrandForeground1"), fontStyle: "bold" },
      { token: "attribute.name.http", foreground: fg("colorBrandForeground2") },
      { token: "attribute.value.http", foreground: fg("colorNeutralForeground1") },
    ],
    colors: {
      "editor.background": "#00000000",
      "editor.foreground": c("colorNeutralForeground1"),
      "editorGutter.background": "#00000000",
      "editorLineNumber.foreground": c("colorNeutralForeground3"),
      "editorLineNumber.activeForeground": c("colorNeutralForeground1"),
      "editorCursor.foreground": c("colorNeutralForeground1"),
      "editor.selectionBackground": withAlpha(
        highContrast ? c("colorNeutralBackground1Selected") : accent,
        highContrast ? 0.5 : 0.25
      ),
      "editor.inactiveSelectionBackground": withAlpha(accent, 0.15),
      "editor.selectionHighlightBackground": withAlpha(accent, 0.12),
      "editor.lineHighlightBackground": withAlpha(c("colorNeutralForeground1"), 0.06),
      "editor.lineHighlightBorder": highContrast ? c("colorStrokeFocus2") : "#00000000",
      "editor.findMatchBackground": withAlpha(c("colorPaletteMarigoldForeground1"), 0.45),
      "editor.findMatchHighlightBackground": withAlpha(c("colorPaletteMarigoldForeground1"), 0.25),
      "editor.foldBackground": withAlpha(accent, 0.08),
      "editorGutter.foldingControlForeground": c("colorNeutralForeground3"),
      "editorIndentGuide.background1": c("colorNeutralStroke2"),
      "editorIndentGuide.activeBackground1": c("colorNeutralStroke1"),
      // Bracket pairs in the delimiter colour, not Monaco's rainbow.
      ...Object.fromEntries(
        [1, 2, 3, 4, 5, 6].map((n) => [
          `editorBracketHighlight.foreground${n}`,
          c("colorNeutralForeground2"),
        ])
      ),
      "editorBracketHighlight.unexpectedBracket.foreground": c("colorStatusDangerForeground1"),
      "editorBracketMatch.background": "#00000000",
      "editorBracketMatch.border": c("colorNeutralStrokeAccessible"),
      "editorError.foreground": c("colorStatusDangerForeground1"),
      "editorWarning.foreground": c("colorStatusWarningForeground1"),
      "editorWidget.background": c("colorNeutralBackground1"),
      "editorWidget.foreground": c("colorNeutralForeground1"),
      "editorWidget.border": c("colorNeutralStroke1"),
      "editorHoverWidget.background": c("colorNeutralBackground1"),
      "editorHoverWidget.foreground": c("colorNeutralForeground1"),
      "editorHoverWidget.border": c("colorNeutralStroke1"),
      "input.background": c("colorNeutralBackground1"),
      "input.foreground": c("colorNeutralForeground1"),
      "input.border": c("colorNeutralStrokeAccessible"),
      "inputOption.activeBorder": c("colorCompoundBrandStroke"),
      "widget.shadow": hexColor(String(theme.colorNeutralShadowAmbient)),
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": withAlpha(c("colorNeutralForeground3"), 0.35),
      "scrollbarSlider.hoverBackground": withAlpha(c("colorNeutralForeground3"), 0.55),
      "scrollbarSlider.activeBackground": withAlpha(c("colorNeutralForeground2"), 0.7),
      focusBorder: c("colorStrokeFocus2"),
      ...(highContrast && {
        contrastBorder: c("colorNeutralStroke1"),
        contrastActiveBorder: c("colorStrokeFocus2"),
      }),
    },
  };
}
