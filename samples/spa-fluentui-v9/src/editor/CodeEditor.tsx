/**
 * A Monaco editor as a React component: read-only code views and the explorer's JSON body editor.
 * Loaded with `React.lazy` (components/CodeBlock.tsx, components/JsonEditor.tsx), so Monaco is
 * downloaded the first time a code view renders.
 */
import { useEffect, useRef } from "react";
import { makeStyles, webLightTheme } from "@fluentui/react-components";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useThemeMode } from "../theme/ThemeProvider";
import { jsonProblems } from "./json";
import { monaco } from "./monaco";
import type { EditorThemeName } from "./theme";
import {
  editorHeight,
  FONT_SIZE,
  LINE_HEIGHT,
  PADDING,
  type CodeEditorProps,
  type EditorProblem,
} from "./types";

const useStyles = makeStyles({
  // Monaco measures its container; the height follows the content (see `fit`).
  host: { width: "100%", minWidth: 0 },
});

function useEditorTheme(): EditorThemeName {
  const { mode } = useThemeMode();
  const forcedColors = useMediaQuery("(forced-colors: active)");
  if (forcedColors) return "fluent-high-contrast";
  return mode === "dark" ? "fluent-dark" : "fluent-light";
}

/** The element that takes keyboard focus and is read by screen readers. */
function inputOf(editor: monaco.editor.IStandaloneCodeEditor): HTMLElement | null {
  return (
    editor.getDomNode()?.querySelector<HTMLElement>(".native-edit-context, textarea.inputarea") ??
    null
  );
}

export default function CodeEditor({
  value,
  language,
  label,
  readOnly = true,
  wordWrap = false,
  minLines = 1,
  maxLines = 22,
  placeholder,
  describedBy,
  invalid,
  onChange,
  onProblems,
  onReady,
}: CodeEditorProps) {
  const styles = useStyles();
  const host = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(undefined);
  const theme = useEditorTheme();
  // The latest callbacks, so the editor is created once.
  const callbacks = useRef({ onChange, onProblems });
  callbacks.current = { onChange, onProblems };
  // The texts the editor reported that haven't come back as `value` yet. While the user types,
  // `value` lags behind the editor (React renders later): those echoes must not replace the text.
  const reported = useRef<string[]>([]);
  // Set while `value` replaces the text: that is not an edit to report.
  const replacing = useRef(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const editor = monaco.editor.create(element, {
      value,
      language,
      theme,
      readOnly,
      // The input is read-only too, so screen readers announce it as such.
      domReadOnly: readOnly,
      ariaLabel: label,
      // Monaco's screen reader support always on (not only when it detects a screen reader).
      accessibilitySupport: "on",
      // Tab moves the focus on, out of the editor, in every editor: no keyboard trap. Enter
      // indents a new line, and Format (Shift+Alt+F) indents the whole JSON body.
      tabFocusMode: true,
      fontFamily: webLightTheme.fontFamilyMonospace,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      padding: { top: PADDING, bottom: PADDING },
      lineNumbers: "on",
      lineNumbersMinChars: 3,
      lineDecorationsWidth: 8,
      glyphMargin: false,
      folding: true,
      showFoldingControls: "always",
      minimap: { enabled: false },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollBeyondLastLine: false,
      // The cursor's line is highlighted while the editor has the focus.
      renderLineHighlight: "line",
      renderLineHighlightOnlyWhenFocus: true,
      wordWrap: wordWrap ? "on" : "off",
      tabSize: 2,
      insertSpaces: true,
      contextmenu: true,
      // The find widget and the context menu may extend past the editor's box.
      fixedOverflowWidgets: true,
      // The page scrolls when the editor can't.
      scrollbar: {
        alwaysConsumeMouseWheel: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
      stickyScroll: { enabled: false },
      automaticLayout: true,
      placeholder,
      // No suggestions while typing: there is nothing to suggest without a schema.
      quickSuggestions: false,
      suggestOnTriggerCharacters: false,
      // Problems are shown with squiggles only where they can be fixed.
      renderValidationDecorations: "editable",
    });
    editorRef.current = editor;

    const min = editorHeight(minLines);
    const max = editorHeight(maxLines);
    let height = 0;
    const fit = () => {
      const next = Math.min(max, Math.max(min, editor.getContentHeight()));
      if (next === height) return;
      height = next;
      element.style.height = `${next}px`;
      editor.layout();
    };
    fit();

    // An editable JSON text is validated as you type (squiggles, and the problems for the field).
    let timer: ReturnType<typeof setTimeout> | undefined;
    const validate = () => {
      const model = editor.getModel();
      if (readOnly || !model || model.getLanguageId() !== "json") return;
      const problems = jsonProblems(model.getValue());
      monaco.editor.setModelMarkers(
        model,
        "json",
        problems.map((p) => {
          const start = model.getPositionAt(p.offset);
          const end = model.getPositionAt(p.offset + Math.max(1, p.length));
          return {
            severity: monaco.MarkerSeverity.Error,
            message: p.message,
            startLineNumber: start.lineNumber,
            startColumn: start.column,
            endLineNumber: end.lineNumber,
            endColumn: end.column,
          };
        })
      );
      callbacks.current.onProblems?.(
        problems.map(({ line, column, message }): EditorProblem => ({ line, column, message }))
      );
    };
    validate();

    const disposables = [
      editor.onDidContentSizeChange(fit),
      editor.onDidChangeModelContent(() => {
        const text = editor.getValue();
        if (callbacks.current.onChange && !replacing.current) {
          reported.current.push(text);
          callbacks.current.onChange(text);
        }
        clearTimeout(timer);
        timer = setTimeout(validate, 300);
      }),
      { dispose: () => clearTimeout(timer) },
    ];
    onReady?.({
      format: () => void editor.getAction("editor.action.formatDocument")?.run(),
      focus: () => editor.focus(),
    });
    return () => {
      for (const d of disposables) d.dispose();
      editor.dispose();
      editorRef.current = undefined;
    };
    // Created once; the effects below keep it in step with the props.
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const echo = reported.current.indexOf(value);
    if (echo >= 0) {
      reported.current.splice(0, echo + 1);
      return;
    }
    // A change from outside (another sample, a new result) replaces the text.
    reported.current = [];
    if (editor.getValue() === value) return;
    replacing.current = true;
    try {
      editor.setValue(value);
    } finally {
      replacing.current = false;
    }
  }, [value]);

  useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model && model.getLanguageId() !== language)
      monaco.editor.setModelLanguage(model, language);
  }, [language]);

  useEffect(() => {
    editorRef.current?.updateOptions({ ariaLabel: label });
  }, [label]);

  // One theme for every editor on the page: it follows the app's light/dark switch and Windows
  // high contrast.
  useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);

  // The field's hint and error message describe the input; a read-only editor says so.
  useEffect(() => {
    const editor = editorRef.current;
    const input = editor && inputOf(editor);
    if (!input) return;
    if (describedBy) input.setAttribute("aria-describedby", describedBy);
    else input.removeAttribute("aria-describedby");
    if (invalid) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    // Monaco's input for screen readers doesn't say it is read-only.
    if (readOnly) input.setAttribute("aria-readonly", "true");
  }, [describedBy, invalid, readOnly]);

  return <div ref={host} className={styles.host} data-editor-language={language} />;
}
