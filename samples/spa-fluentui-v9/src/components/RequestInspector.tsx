import { Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Caption1,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import type { Exchange } from "../sdk/inspector";
import { CodeBlock } from "./CodeBlock";
import { MethodBadge, StatusBadge } from "./StatusBadge";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    width: "100%",
  },
  url: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
  },
  time: {
    color: tokens.colorNeutralForeground3,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalM,
  },
  fullUrl: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    overflowWrap: "anywhere",
  },
  headers: {
    display: "grid",
    gridTemplateColumns: "fit-content(40%) minmax(0, 1fr)",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXXS,
    margin: 0,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    "& dt": { color: tokens.colorNeutralForeground3, overflowWrap: "anywhere" },
    "& dd": { margin: 0, overflowWrap: "anywhere" },
  },
  empty: { color: tokens.colorNeutralForeground3 },
});

/** The path after the Web API root, decoded so OData reads naturally. */
export function displayUrl(url: string): string {
  let text = url
    .replace(/^https:\/\/[^/]+\/api\/data\/v\d+\.\d+/, "")
    .replace(/^https:\/\/[^/]+/, "");
  try {
    text = decodeURIComponent(text);
  } catch {
    // Keep it encoded.
  }
  return text || "/";
}

function HeaderList({ headers }: { headers: Record<string, string> }) {
  const styles = useStyles();
  const entries = Object.entries(headers);
  if (!entries.length) return <Caption1 className={styles.empty}>None</Caption1>;
  return (
    <dl className={styles.headers}>
      {entries.map(([name, value]) => (
        <Fragment key={name}>
          <dt>{name}</dt>
          <dd>{value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

/** Every request the scenario's client sent: method, URL, status, timing, headers and bodies. */
export function RequestInspector({ exchanges }: { exchanges: Exchange[] }) {
  const styles = useStyles();
  if (!exchanges.length) {
    return (
      <Caption1 className={styles.empty}>
        No requests yet. Run the scenario to see them here.
      </Caption1>
    );
  }
  return (
    <Accordion multiple collapsible>
      {exchanges.map((e) => (
        <AccordionItem key={e.id} value={e.id}>
          <AccordionHeader size="small">
            <span className={styles.header}>
              <MethodBadge method={e.method} />
              <StatusBadge status={e.status} error={e.error} />
              <span className={styles.url} title={e.url}>
                {displayUrl(e.url)}
              </span>
              {e.attempt > 1 && (
                <Badge appearance="outline" color="warning" shape="rounded">
                  retry {e.attempt - 1}
                </Badge>
              )}
              {e.via && (
                <Badge appearance="outline" color="informative" shape="rounded">
                  {e.via}
                </Badge>
              )}
              {e.durationMs !== undefined && (
                <Caption1 className={styles.time}>{e.durationMs} ms</Caption1>
              )}
            </span>
          </AccordionHeader>
          <AccordionPanel className={styles.panel}>
            <Text weight="semibold" size={200}>
              URL
            </Text>
            <span className={styles.fullUrl}>{e.url}</span>
            {e.error && (
              <>
                <Text weight="semibold" size={200}>
                  Error
                </Text>
                <span className={styles.fullUrl}>{e.error}</span>
              </>
            )}
            <Text weight="semibold" size={200}>
              Request headers
            </Text>
            <HeaderList headers={e.requestHeaders} />
            {e.requestBody && <CodeBlock code={e.requestBody} plain label="Request body" />}
            {e.responseHeaders && (
              <>
                <Text weight="semibold" size={200}>
                  Response headers
                </Text>
                <HeaderList headers={e.responseHeaders} />
              </>
            )}
            {e.responseBody && <CodeBlock code={e.responseBody} plain label="Response body" />}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
