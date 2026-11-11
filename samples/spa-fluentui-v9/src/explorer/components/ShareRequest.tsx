import { useEffect, useId, useState } from "react";
import {
  Button,
  Caption1,
  Field,
  Input,
  makeStyles,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Subtitle2,
  Switch,
  tokens,
} from "@fluentui/react-components";
import { LinkRegular, ShareRegular } from "@fluentui/react-icons";
import { useCopy } from "../../hooks/useCopy";
import { useCommonStyles } from "../../theme/styles";
import { encodeShare, shareLink, type SharedRequest } from "../share";

const useStyles = makeStyles({
  surface: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "min(26rem, calc(100vw - 2rem))",
  },
  link: { fontFamily: tokens.fontFamilyMonospace },
  actions: { display: "flex", justifyContent: "flex-end" },
});

interface ShareRequestProps {
  /** The request in the explorer, or `undefined` when there is none to share. */
  request: SharedRequest | undefined;
  /** The environment in use: an absolute URL of it becomes relative, and it can be included. */
  environmentUrl: string;
}

type LinkState = { link: string } | { error: string } | undefined;

/**
 * "Share": a link to the request in the explorer, in the URL fragment (never sent to a server),
 * without the access token or secret headers, and with the environment URL only if asked for.
 */
export function ShareRequest({ request, environmentUrl }: ShareRequestProps) {
  const styles = useStyles();
  const common = useCommonStyles();
  const copy = useCopy();
  const headingId = useId();
  const [open, setOpen] = useState(false);
  const [includeEnvironment, setIncludeEnvironment] = useState(false);
  const [state, setState] = useState<LinkState>();
  const host = new URL(environmentUrl).host;

  useEffect(() => {
    if (!open || !request) return;
    let cancelled = false;
    encodeShare(request, { environmentUrl, includeEnvironment }).then(
      (payload) => !cancelled && setState({ link: shareLink(window.location.origin, payload) }),
      (error: unknown) =>
        !cancelled && setState({ error: error instanceof Error ? error.message : String(error) })
    );
    return () => {
      cancelled = true;
    };
  }, [open, request, environmentUrl, includeEnvironment]);

  const link = state && "link" in state ? state.link : undefined;

  return (
    <Popover
      open={open}
      onOpenChange={(_, data) => setOpen(data.open)}
      trapFocus
      withArrow
      positioning="below-end"
    >
      <PopoverTrigger disableButtonEnhancement>
        <Button icon={<ShareRegular />} disabled={!request}>
          Share
        </Button>
      </PopoverTrigger>
      <PopoverSurface className={styles.surface} aria-labelledby={headingId}>
        <Subtitle2 as="h3" id={headingId}>
          Share this request
        </Subtitle2>
        <Caption1>
          The link holds the request (method, URL, headers and body, or the operation and its
          parameters) after its <span className={common.mono}>#</span>, which the browser never
          sends to a server. It never holds your access token or sign-in headers. Whoever opens it
          sees the request, and runs it only if they choose to.
        </Caption1>
        <Switch
          checked={includeEnvironment}
          onChange={(_, data) => setIncludeEnvironment(data.checked)}
          label={`Include the environment (${host})`}
        />
        <Field
          label="Link"
          validationState={state && "error" in state ? "error" : "none"}
          validationMessage={state && "error" in state ? state.error : undefined}
        >
          <Input
            className={styles.link}
            readOnly
            value={link ?? ""}
            onFocus={(e) => e.currentTarget.select()}
            spellCheck={false}
          />
        </Field>
        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<LinkRegular />}
            disabled={!link}
            onClick={() => link && void copy(link, "Link copied to the clipboard")}
          >
            Copy link
          </Button>
        </div>
      </PopoverSurface>
    </Popover>
  );
}
