import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Body1Strong,
  Button,
  Caption1,
  Checkbox,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Link,
  makeStyles,
  OverlayDrawer,
  SearchBox,
  Skeleton,
  SkeletonItem,
  Tab,
  TabList,
  tokens,
} from "@fluentui/react-components";
import { ArrowLeftRegular, ArrowClockwiseRegular, DismissRegular } from "@fluentui/react-icons";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { ErrorCard } from "../../components/ErrorCard";
import { RecordsGrid } from "../../components/RecordsGrid";
import { useTabs } from "../../components/tabs";
import { useCommonStyles } from "../../theme/styles";
import {
  cached,
  fetchTableDetails,
  fetchTables,
  filterTables,
  tableQuery,
  type TableDetails,
  type TableSummary,
} from "../tables";
import type { RawRequestInput } from "../types";

const useStyles = makeStyles({
  body: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  loading: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  heading: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXS },
  query: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalM,
  },
  panel: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, minWidth: 0 },
  footer: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalS },
});

/** Tables listed at most; the filter narrows the rest. */
const SHOWN = 100;

type Load<T> =
  { status: "loading" } | { status: "loaded"; value: T } | { status: "failed"; error: unknown };

/** Loads `load()` (cached under `key`) while `key` is set; `retry()` loads it again. */
function useCached<T>(key: string | undefined, load: () => Promise<T>) {
  const [state, setState] = useState<Load<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    setState({ status: "loading" });
    cached(key, load).then(
      (value) => !cancelled && setState({ status: "loaded", value }),
      (error: unknown) => !cancelled && setState({ status: "failed", error })
    );
    return () => {
      cancelled = true;
    };
    // `load` reads what `key` names.
  }, [key, attempt]);
  return { state, retry: () => setAttempt((n) => n + 1) };
}

function Loading({ label }: { label: string }) {
  const styles = useStyles();
  return (
    <Skeleton className={styles.loading} aria-label={label}>
      <SkeletonItem size={32} />
      <SkeletonItem size={24} />
      <SkeletonItem size={24} />
      <SkeletonItem size={24} />
    </Skeleton>
  );
}

function Failed({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <>
      <ErrorCard error={error} />
      <div>
        <Button icon={<ArrowClockwiseRegular />} onClick={retry}>
          Try again
        </Button>
      </div>
    </>
  );
}

function TableList({
  tables,
  onOpen,
}: {
  tables: TableSummary[];
  onOpen: (table: TableSummary) => void;
}) {
  const styles = useStyles();
  const common = useCommonStyles();
  const [query, setQuery] = useState("");
  const shown = useMemo(() => filterTables(tables, query), [tables, query]);
  return (
    <div className={styles.panel}>
      <Field label="Filter tables">
        <SearchBox
          value={query}
          onChange={(_, d) => setQuery(d.value)}
          placeholder="Name or entity set"
        />
      </Field>
      <Caption1 role="status" className={common.muted}>
        {shown.length === tables.length
          ? `${tables.length} tables`
          : `${shown.length} of ${tables.length} tables match`}
        {shown.length > SHOWN ? `; showing the first ${SHOWN}` : ""}
      </Caption1>
      <RecordsGrid<TableSummary>
        label="Tables"
        rows={shown.slice(0, SHOWN)}
        getRowId={(t) => t.logicalName}
        columns={[
          {
            key: "displayName",
            label: "Table",
            render: (t) => (
              <Link as="button" onClick={() => onOpen(t)} aria-label={`Open ${t.logicalName}`}>
                {t.displayName || t.logicalName}
              </Link>
            ),
          },
          { key: "logicalName", label: "Logical name" },
          { key: "entitySetName", label: "Entity set" },
          {
            key: "custom",
            label: "Custom",
            render: (t) =>
              t.custom ? (
                <Badge appearance="tint" color="brand">
                  Custom
                </Badge>
              ) : (
                "—"
              ),
          },
        ]}
      />
    </div>
  );
}

type DetailTab = "columns" | "keys" | "relationships";

function TableDetail({
  table,
  details,
  selected,
  onSelectedChange,
}: {
  table: TableSummary;
  details: TableDetails;
  selected: ReadonlySet<string>;
  onSelectedChange: (selected: Set<string>) => void;
}) {
  const styles = useStyles();
  const [tab, setTab] = useState<DetailTab>("columns");
  const tabs = useTabs(tab, setTab, `${table.logicalName} details`);
  const toggle = (name: string, on: boolean) => {
    const next = new Set(selected);
    if (on) next.add(name);
    else next.delete(name);
    onSelectedChange(next);
  };
  return (
    <div className={styles.panel}>
      <TabList {...tabs.list}>
        <Tab {...tabs.tab("columns")}>Columns ({details.columns.length})</Tab>
        <Tab {...tabs.tab("keys")}>Keys ({details.keys.length})</Tab>
        <Tab {...tabs.tab("relationships")}>Relationships ({details.relationships.length})</Tab>
      </TabList>
      <div {...tabs.panel} className={styles.panel}>
        {tab === "columns" && (
          <RecordsGrid
            label={`Columns of ${table.logicalName}`}
            rows={details.columns}
            getRowId={(c) => c.logicalName}
            columns={[
              {
                key: "select",
                label: "$select",
                render: (c) => (
                  <Checkbox
                    aria-label={`Select ${c.logicalName}`}
                    checked={selected.has(c.selectName)}
                    disabled={!c.selectable}
                    onChange={(_, d) => toggle(c.selectName, d.checked === true)}
                  />
                ),
              },
              { key: "logicalName", label: "Logical name" },
              { key: "displayName", label: "Display name" },
              { key: "type", label: "Type" },
              { key: "required", label: "Required" },
              {
                key: "maxLength",
                label: "Max length",
                render: (c) => (c.maxLength === undefined ? "—" : String(c.maxLength)),
              },
            ]}
          />
        )}
        {tab === "keys" && (
          <RecordsGrid
            label={`Alternate keys of ${table.logicalName}`}
            rows={details.keys}
            getRowId={(k) => k.logicalName}
            columns={[
              { key: "logicalName", label: "Logical name" },
              { key: "displayName", label: "Display name" },
              { key: "attributes", label: "Columns", render: (k) => k.attributes.join(", ") },
              { key: "status", label: "Index" },
            ]}
          />
        )}
        {tab === "relationships" && (
          <RecordsGrid
            label={`Relationships of ${table.logicalName}`}
            rows={details.relationships}
            getRowId={(r) => `${r.kind}-${r.schemaName}`}
            columns={[
              { key: "kind", label: "Kind" },
              { key: "schemaName", label: "Schema name" },
              { key: "relatedTable", label: "Related table" },
              { key: "navigationProperty", label: "Navigation property ($expand)" },
              { key: "lookup", label: "Lookup column" },
            ]}
          />
        )}
      </div>
    </div>
  );
}

interface TableBrowserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** A client for the environment and Web API version the explorer uses. */
  createClient: () => DataverseClient;
  /** What the reads are cached under: the account, environment and version. */
  cacheKey: string;
  /** "Query this table": the request to put in the explorer. */
  onQuery: (request: RawRequestInput, table: TableSummary) => void;
}

/**
 * The table browser, in a drawer over the explorer: the environment's tables (read when the
 * drawer first opens), then a table's columns, keys and relationships, and "Query this table",
 * which fills in the explorer's request with the columns picked for `$select`.
 */
export function TableBrowser({
  open,
  onOpenChange,
  createClient,
  cacheKey,
  onQuery,
}: TableBrowserProps) {
  const styles = useStyles();
  const common = useCommonStyles();
  const [table, setTable] = useState<TableSummary>();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const tables = useCached(open ? `${cacheKey}|tables` : undefined, () =>
    fetchTables(createClient())
  );
  const details = useCached(
    open && table ? `${cacheKey}|table|${table.logicalName}` : undefined,
    () => fetchTableDetails(createClient(), table?.logicalName ?? "")
  );

  // Another environment or version: start from the list again.
  useEffect(() => setTable(undefined), [cacheKey]);

  const openTable = (t: TableSummary) => {
    setSelected(new Set());
    setTable(t);
  };
  const request = table ? tableQuery(table, [...selected]) : undefined;

  return (
    <OverlayDrawer
      position="end"
      size="large"
      open={open}
      onOpenChange={(_, d) => onOpenChange(d.open)}
      aria-labelledby="table-browser-title"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          heading={{ id: "table-browser-title" }}
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<DismissRegular />}
              onClick={() => onOpenChange(false)}
            />
          }
        >
          {table ? table.displayName || table.logicalName : "Tables"}
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody className={styles.body}>
        {!table && (
          <>
            <Caption1 className={common.muted}>
              The environment&apos;s tables, from{" "}
              <span className={common.mono}>EntityDefinitions</span>. Open one to see its columns,
              keys and relationships, and to query it.
            </Caption1>
            {tables.state.status === "loading" && <Loading label="Loading the tables…" />}
            {tables.state.status === "failed" && (
              <Failed error={tables.state.error} retry={tables.retry} />
            )}
            {tables.state.status === "loaded" && (
              <TableList tables={tables.state.value} onOpen={openTable} />
            )}
          </>
        )}
        {table && (
          <>
            <div>
              <Button icon={<ArrowLeftRegular />} onClick={() => setTable(undefined)}>
                All tables
              </Button>
            </div>
            <div className={styles.heading}>
              <Body1Strong className={common.mono}>{table.logicalName}</Body1Strong>
              <Caption1 className={common.muted}>
                Entity set <span className={common.mono}>{table.entitySetName}</span> · primary id{" "}
                <span className={common.mono}>{table.primaryIdAttribute}</span>
                {table.primaryNameAttribute && (
                  <>
                    {" "}
                    · primary name <span className={common.mono}>{table.primaryNameAttribute}</span>
                  </>
                )}
              </Caption1>
            </div>
            {details.state.status === "loading" && <Loading label="Loading the table…" />}
            {details.state.status === "failed" && (
              <Failed error={details.state.error} retry={details.retry} />
            )}
            {details.state.status === "loaded" && (
              <TableDetail
                table={table}
                details={details.state.value}
                selected={selected}
                onSelectedChange={setSelected}
              />
            )}
          </>
        )}
      </DrawerBody>
      {table && request && (
        <DrawerFooter className={styles.footer}>
          <div className={styles.query}>
            <Button appearance="primary" onClick={() => onQuery(request, table)}>
              Query this table
            </Button>
            <Caption1 className={common.mono}>GET {request.url}</Caption1>
          </div>
        </DrawerFooter>
      )}
    </OverlayDrawer>
  );
}
