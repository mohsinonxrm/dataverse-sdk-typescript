import { Fragment, type ReactNode } from "react";
import {
  Body1,
  Caption1,
  makeStyles,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens,
} from "@fluentui/react-components";
import type { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import { classifyError } from "../lib/errors";
import { CodeBlock } from "./CodeBlock";
import { StatusBadge } from "./StatusBadge";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  details: {
    display: "grid",
    gridTemplateColumns: "fit-content(40%) minmax(0, 1fr)",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalXS,
    margin: 0,
    "& dt": {
      color: tokens.colorNeutralForeground3,
      fontSize: tokens.fontSizeBase200,
      overflowWrap: "anywhere",
    },
    "& dd": {
      margin: 0,
      overflowWrap: "anywhere",
      fontFamily: tokens.fontFamilyMonospace,
      fontSize: tokens.fontSizeBase200,
    },
  },
  tableWrap: { overflowX: "auto" },
  message: { overflowWrap: "anywhere" },
});

type Detail = [label: string, value: ReactNode | undefined];

function Details({ items }: { items: Detail[] }) {
  const styles = useStyles();
  const shown = items.filter(([, v]) => v !== undefined && v !== "");
  if (!shown.length) return null;
  return (
    <dl className={styles.details}>
      {shown.map(([label, value]) => (
        <Fragment key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

function dataverseDetails(error: DataverseError): Detail[] {
  return [
    ["Status", error.status !== undefined ? <StatusBadge status={error.status} /> : undefined],
    ["Code", error.code],
    ["Request id", error.requestId],
    ["Correlation id", error.correlationId],
  ];
}

function Shell({
  intent = "error",
  title,
  message,
  children,
}: {
  intent?: "error" | "warning";
  title: string;
  message: string;
  children?: ReactNode;
}) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <MessageBar intent={intent} layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>{title}</MessageBarTitle>
          <span className={styles.message}>{message}</span>
        </MessageBarBody>
      </MessageBar>
      {children}
    </div>
  );
}

/**
 * A card for any error the SDK throws, laid out for its type: OData errors with their code and
 * ids, throttling with `Retry-After`, `$batch` failures request by request, and network errors
 * and aborts, which have no response.
 */
export function ErrorCard({ error }: { error: unknown }) {
  const styles = useStyles();
  const c = classifyError(error);
  switch (c.kind) {
    case "batch": {
      const e = c.error;
      const results = e.result?.results ?? [...e.requestErrors.values()];
      return (
        <Shell title="DataverseBatchError" message={e.message}>
          <Body1>
            {e.successfulRequests} of {e.totalRequests} requests succeeded, {e.failedRequests}{" "}
            failed
            {e.result?.skippedRequestIds.length
              ? `, ${e.result.skippedRequestIds.length} were not run`
              : ""}
            .
          </Body1>
          <div className={styles.tableWrap}>
            <Table size="small" aria-label="Batch results">
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Request</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Error</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r) => {
                  const partError = e.result?.errors.get(r.id);
                  return (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>
                        <StatusBadge status={r.status} />
                      </TableCell>
                      <TableCell>{partError?.message ?? ""}</TableCell>
                    </TableRow>
                  );
                })}
                {e.result?.skippedRequestIds.map((id) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>
                      <Caption1>not run</Caption1>
                    </TableCell>
                    <TableCell>
                      Skipped after an earlier failure or rolled back with its change set
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Shell>
      );
    }
    case "throttle": {
      const e = c.error;
      const seconds = e.retryAfterMs !== undefined ? Math.ceil(e.retryAfterMs / 1000) : undefined;
      return (
        <Shell
          intent="warning"
          title="DataverseThrottleError: service protection limit"
          message={e.message}
        >
          <Details
            items={[
              [
                "Retry after",
                seconds !== undefined
                  ? `${seconds} s (retryAfterMs = ${e.retryAfterMs})`
                  : "not given",
              ],
              ...dataverseDetails(e),
            ]}
          />
        </Shell>
      );
    }
    case "odata": {
      const e = c.error;
      const inner = e.innerError;
      return (
        <Shell title={`DataverseODataError${e.status ? ` (${e.status})` : ""}`} message={e.message}>
          <Details
            items={[
              ...dataverseDetails(e),
              [
                "Inner error",
                inner ? [inner.type, inner.message].filter(Boolean).join(": ") : undefined,
              ],
            ]}
          />
          {inner?.stacktrace && (
            <CodeBlock code={inner.stacktrace} plain label="Inner error stack trace" />
          )}
        </Shell>
      );
    }
    case "abort":
      return (
        <Shell intent="warning" title="Cancelled" message={`${c.error.name}: ${c.error.message}`} />
      );
    case "network":
      return (
        <Shell title={`DataverseNetworkError (${c.error.name})`} message={c.error.message}>
          <Details
            items={[
              [
                "Cause",
                c.error.cause instanceof Error
                  ? `${c.error.cause.name}: ${c.error.cause.message}`
                  : undefined,
              ],
            ]}
          />
        </Shell>
      );
    case "invalid":
      return (
        <Shell title={`DataverseInvalidRequestError (${c.error.name})`} message={c.error.message}>
          <Caption1>The SDK stopped this request before sending it.</Caption1>
        </Shell>
      );
    case "auth":
      return (
        <Shell title={`DataverseAuthenticationError (${c.error.name})`} message={c.error.message}>
          <Details items={dataverseDetails(c.error)} />
        </Shell>
      );
    case "dataverse":
      return (
        <Shell title={c.error.name} message={c.error.message}>
          <Details items={dataverseDetails(c.error)} />
        </Shell>
      );
    case "unknown":
      return <Shell title={c.error.name} message={c.error.message} />;
  }
}
