import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  Button,
  makeStyles,
  mergeClasses,
  tokens,
  Tooltip,
  useToastController,
  Toast,
  ToastTitle,
} from "@fluentui/react-components";
import { CopyRegular } from "@fluentui/react-icons";
import { useCommonStyles } from "../theme/styles";
import { TOASTER_ID } from "./toaster";

const useStyles = makeStyles({
  root: {
    position: "relative",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  pre: {
    margin: 0,
    paddingBlock: tokens.spacingVerticalM,
    paddingInlineStart: tokens.spacingHorizontalM,
    // Room for the copy button, so it never covers the first line.
    paddingInlineEnd: tokens.spacingHorizontalXXXL,
    overflowX: "auto",
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    tabSize: 2,
    maxHeight: "28rem",
  },
  copy: {
    position: "absolute",
    top: tokens.spacingVerticalXS,
    insetInlineEnd: tokens.spacingHorizontalXS,
    // Hides the code scrolling under it.
    backgroundColor: tokens.colorNeutralBackground3,
  },
  keyword: { color: tokens.colorBrandForeground1, fontWeight: tokens.fontWeightSemibold },
  string: { color: tokens.colorPaletteGreenForeground1 },
  comment: { color: tokens.colorNeutralForeground3, fontStyle: "italic" },
  number: { color: tokens.colorPaletteBerryForeground1 },
});

const TOKENS =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|from|export|async|await|function|const|let|return|new|for|of|if|else|type|interface|throw|try|catch|finally|true|false|null|undefined)\b|\b(\d[\d_]*(?:\.\d+)?)\b/g;

function highlight(code: string, styles: ReturnType<typeof useStyles>): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of code.matchAll(TOKENS)) {
    const index = m.index;
    if (index > last) out.push(code.slice(last, index));
    const className = m[1]
      ? styles.comment
      : m[2]
        ? styles.string
        : m[3]
          ? styles.keyword
          : styles.number;
    out.push(
      <span key={index} className={className}>
        {m[0]}
      </span>
    );
    last = index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

interface CodeBlockProps {
  code: string;
  /** Plain text (JSON, HTTP) instead of TypeScript: no highlighting. */
  plain?: boolean;
  label: string;
  className?: string;
}

/**
 * A scrollable, keyboard-focusable code block with a copy button. Read-only code everywhere in the
 * app goes through this component (and `JsonView`), so an editor can replace it in one place.
 */
export function CodeBlock({ code, plain, label, className }: CodeBlockProps) {
  const styles = useStyles();
  const common = useCommonStyles();
  const { dispatchToast } = useToastController(TOASTER_ID);
  const content = useMemo(() => (plain ? code : highlight(code, styles)), [code, plain, styles]);

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
    <div className={mergeClasses(styles.root, className)}>
      <pre
        className={mergeClasses(styles.pre, common.focusableRegion)}
        tabIndex={0}
        aria-label={label}
      >
        <code>{content}</code>
      </pre>
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
