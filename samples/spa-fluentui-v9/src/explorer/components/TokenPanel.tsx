import { useCallback, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Caption1,
  makeStyles,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens,
} from "@fluentui/react-components";
import { ArrowClockwiseRegular, KeyRegular } from "@fluentui/react-icons";
import { ErrorCard } from "../../components/ErrorCard";
import { JsonView } from "../../components/JsonView";
import { useCopy } from "../../hooks/useCopy";
import { useSdkContext } from "../../sdk/SdkProvider";
import { useCommonStyles } from "../../theme/styles";
import { claimSummary, decodeJwt, type DecodedToken } from "../token";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, minWidth: 0 },
  actions: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalS },
  table: { tableLayout: "auto" },
  claim: { color: tokens.colorNeutralForeground3, fontFamily: tokens.fontFamilyMonospace },
  value: { overflowWrap: "anywhere", fontFamily: tokens.fontFamilyMonospace },
  relative: { color: tokens.colorNeutralForeground3 },
  label: { whiteSpace: "nowrap" },
});

type State =
  | { status: "loading" }
  | { status: "decoded"; token: DecodedToken }
  | { status: "failed"; error: unknown };

/**
 * The Token tab: the access token the explorer's requests carry, decoded here in the browser.
 * Only the header and claims are kept (the raw token isn't held in state or shown); the raw value
 * is fetched again, and copied, only when the visitor asks for it.
 */
export function TokenPanel() {
  const styles = useStyles();
  const common = useCommonStyles();
  const copy = useCopy();
  const { session, connection } = useSdkContext();
  const demo = session.mode === "demo";
  const host = new URL(connection.environmentUrl).host;
  const [state, setState] = useState<State>({ status: "loading" });
  const [now, setNow] = useState(Date.now);

  const token = useCallback(
    () => connection.tokenProvider.getToken(connection.scopes),
    [connection]
  );

  const decode = useCallback(() => {
    let cancelled = false;
    setState({ status: "loading" });
    token().then(
      (raw) => {
        if (cancelled) return;
        try {
          setState({ status: "decoded", token: decodeJwt(raw) });
        } catch (error) {
          setState({ status: "failed", error });
        }
        setNow(Date.now());
      },
      (error: unknown) => !cancelled && setState({ status: "failed", error })
    );
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(decode, [decode]);

  // The relative times ("in 54 minutes") keep up while the tab is open.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const copyRaw = async () => {
    try {
      await copy(await token(), "Access token copied: treat it like a password");
    } catch (error) {
      setState({ status: "failed", error });
    }
  };

  const rows = state.status === "decoded" ? claimSummary(state.token.claims, now) : [];

  return (
    <div className={styles.root}>
      {demo ? (
        <MessageBar intent="info" layout="multiline">
          <MessageBarBody>
            <MessageBarTitle>Demo token</MessageBarTitle>
            Made up in your browser for the demo user: unsigned, not issued by Microsoft Entra ID,
            and accepted by nothing but the demo environment.
          </MessageBarBody>
        </MessageBar>
      ) : (
        <MessageBar intent="warning" layout="multiline">
          <MessageBarBody>
            <MessageBarTitle>An access token is a secret</MessageBarTitle>
            Anyone who has it can call <span className={common.mono}>{host}</span> as you until it
            expires. Don&apos;t paste it into issues, chats or logs. It is decoded here, in your
            browser, and sent nowhere else.
          </MessageBarBody>
        </MessageBar>
      )}
      {state.status === "loading" && <Spinner size="small" label="Getting the token…" />}
      {state.status === "failed" && <ErrorCard error={state.error} />}
      {state.status === "decoded" && (
        <>
          <Table size="small" aria-label="Token claims" className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Claim</TableHeaderCell>
                <TableHeaderCell>Value</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.claim}>
                  <TableCell>
                    <span className={styles.label}>{row.label}</span>{" "}
                    <span className={styles.claim}>({row.claim})</span>
                  </TableCell>
                  <TableCell>
                    <span className={styles.value}>{row.value}</span>
                    {row.relative && <span className={styles.relative}> · {row.relative}</span>}
                    {row.expired && (
                      <>
                        {" "}
                        <Badge appearance="tint" color="danger" shape="rounded">
                          Expired
                        </Badge>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <JsonView value={state.token.header} label="Token header" />
          <JsonView value={state.token.claims} label="Token claims" />
          <Caption1 className={common.muted}>
            The signature, the token&apos;s third part, isn&apos;t shown.
          </Caption1>
        </>
      )}
      <div className={styles.actions}>
        <Button icon={<ArrowClockwiseRegular />} onClick={decode}>
          Decode again
        </Button>
        <Button icon={<KeyRegular />} onClick={() => void copyRaw()}>
          Copy the raw token
        </Button>
      </div>
    </div>
  );
}
