import {
  Button,
  createFocusOutlineStyle,
  makeStyles,
  mergeClasses,
  tokens,
  Tooltip,
  useToastController,
  Toast,
  ToastTitle,
} from "@fluentui/react-components";
import { CopyRegular } from "@fluentui/react-icons";
import { detectLanguage, type EditorLanguage } from "../editor/types";
import { LazyEditor } from "./LazyEditor";
import { TOASTER_ID } from "./toaster";

const useStyles = makeStyles({
  root: {
    position: "relative",
    minWidth: 0,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  // Clips the editor to the rounded corners; shows Fluent's focus outline while the editor has
  // keyboard focus.
  editor: {
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    ...createFocusOutlineStyle({
      selector: "focus-within",
      style: { outlineOffset: `calc(${tokens.strokeWidthThick} * -1)` },
    }),
  },
  // If the editor can't be loaded: the code as plain text.
  pre: {
    margin: 0,
    paddingBlock: tokens.spacingVerticalS,
    paddingInline: tokens.spacingHorizontalM,
    overflowX: "auto",
    maxHeight: "28rem",
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    tabSize: 2,
  },
  copy: {
    position: "absolute",
    top: tokens.spacingVerticalXS,
    // Clear of the editor's vertical scroll bar.
    insetInlineEnd: tokens.spacingHorizontalL,
    // Hides the code scrolling under it.
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

interface CodeBlockProps {
  code: string;
  /** Not TypeScript: JSON, an HTTP request or plain text, told apart by the content. */
  plain?: boolean;
  /** The language, instead of telling it from `plain` and the content. */
  language?: EditorLanguage;
  label: string;
  className?: string;
}

/**
 * Read-only code with a copy button, in a Monaco editor (loaded on first use): highlighting, line
 * numbers, folding and find. Read-only code everywhere in the app goes through this component
 * (and `JsonView`).
 */
export function CodeBlock({ code, plain, language, label, className }: CodeBlockProps) {
  const styles = useStyles();
  const { dispatchToast } = useToastController(TOASTER_ID);
  const lang = language ?? detectLanguage(code, plain);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      dispatchToast(
        <Toast>
          <ToastTitle>Copied to the clipboard</ToastTitle>
        </Toast>,
        { intent: "success", timeout: 2000 }
      );
    } catch {
      dispatchToast(
        <Toast>
          <ToastTitle>The browser didn't allow copying</ToastTitle>
        </Toast>,
        { intent: "warning" }
      );
    }
  };

  return (
    <div className={mergeClasses(styles.root, className)} data-code-block={lang}>
      <div className={styles.editor}>
        <LazyEditor
          value={code}
          language={lang}
          label={label}
          // Long request lines (URLs) wrap; code and JSON scroll sideways.
          wordWrap={lang === "http" || lang === "plaintext"}
          fallback={
            <pre className={styles.pre} tabIndex={0} aria-label={label}>
              <code>{code}</code>
            </pre>
          }
        />
      </div>
      <Tooltip content={`Copy ${label.toLowerCase()}`} relationship="label">
        <Button
          className={styles.copy}
          appearance="subtle"
          size="small"
          icon={<CopyRegular />}
          onClick={copy}
        />
      </Tooltip>
    </div>
  );
}
