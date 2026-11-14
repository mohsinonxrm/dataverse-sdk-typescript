import { useEffect, useRef, useState } from "react";
import {
  Button,
  Caption1,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  tokens,
} from "@fluentui/react-components";
import { CodeRegular, CopyRegular } from "@fluentui/react-icons";
import { CodeBlock } from "../../components/CodeBlock";
import type { EditorLanguage } from "../../editor/types";
import { useCopy } from "../../hooks/useCopy";
import { useCommonStyles } from "../../theme/styles";
import {
  copyAs,
  COPY_AS_FORMATS,
  ORG_PLACEHOLDER,
  TOKEN_PLACEHOLDER,
  type CopyAsFormat,
  type CopyAsRequest,
} from "../copyAs";

const useStyles = makeStyles({
  surface: { maxWidth: "min(56rem, calc(100vw - 2rem))" },
  content: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
});

const LANGUAGE: Record<CopyAsFormat, EditorLanguage> = {
  curl: "shell",
  fetch: "typescript",
  csharp: "csharp",
};

interface CopyAsMenuProps {
  /** The requests the SDK builds for the explorer's request, or `undefined` while there are none. */
  requests: readonly CopyAsRequest[] | undefined;
  /** The demo's environment isn't real: its URL is written as a placeholder. */
  demo: boolean;
}

/** "Copy as": the request as curl, fetch or C# HttpClient code, in a dialog to read and copy. */
export function CopyAsMenu({ requests, demo }: CopyAsMenuProps) {
  const styles = useStyles();
  const common = useCommonStyles();
  const copy = useCopy();
  const [format, setFormat] = useState<CopyAsFormat>();
  const label = COPY_AS_FORMATS.find((f) => f.value === format)?.label ?? "";
  const code = format && requests?.length ? copyAs(format, requests) : "";
  const copyButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const opened = useRef(false);

  // The dialog focuses its first focusable element, which is the code view's stand-in while the
  // editor loads: once the editor replaces it, the focus would be lost. The Copy button takes it,
  // and the menu's button gets it back when the dialog closes.
  useEffect(() => {
    if (format) {
      opened.current = true;
      copyButton.current?.focus();
    } else if (opened.current) {
      opened.current = false;
      menuButton.current?.focus();
    }
  }, [format]);

  return (
    <>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton ref={menuButton} icon={<CodeRegular />} disabled={!requests?.length}>
            Copy as
          </MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {COPY_AS_FORMATS.map((f) => (
              <MenuItem
                key={f.value}
                // After the menu has closed and given the focus back to its button: the dialog
                // then takes the focus, and gives it back to the button when it closes.
                onClick={() => setTimeout(() => setFormat(f.value), 0)}
              >
                {f.label}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
      <Dialog
        open={Boolean(format && code)}
        onOpenChange={(_, data) => !data.open && setFormat(undefined)}
      >
        <DialogSurface className={styles.surface}>
          <DialogBody>
            <DialogTitle>Copy as {label}</DialogTitle>
            <DialogContent className={styles.content}>
              <Caption1>
                The request the SDK sends, without the SDK. Replace{" "}
                <span className={common.mono}>{TOKEN_PLACEHOLDER}</span> with an access token for
                the environment
                {demo ? (
                  <>
                    {" "}
                    and <span className={common.mono}>{ORG_PLACEHOLDER}</span> with its URL: the
                    demo environment isn&apos;t a real one
                  </>
                ) : null}
                .
              </Caption1>
              {format && <CodeBlock code={code} language={LANGUAGE[format]} label={label} />}
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button
                ref={copyButton}
                appearance="primary"
                icon={<CopyRegular />}
                onClick={() => void copy(code)}
              >
                Copy
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
}
