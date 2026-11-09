import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Caption1,
  Field,
  makeStyles,
  SearchBox,
  Select,
  Spinner,
  Tab,
  TabList,
  Text,
  tokens,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { ErrorCard } from "../../components/ErrorCard";
import { MethodBadge, StatusBadge } from "../../components/StatusBadge";
import { loadCatalog } from "../catalog/load";
import type { HistoryEntry } from "../history";
import { SAMPLE_GROUPS, SAMPLES, sampleMethod, type Sample } from "../samples";
import { OPERATION_KINDS, type CatalogOperation, type OperationKind } from "../types";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, minWidth: 0 },
  panel: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, minWidth: 0 },
  list: {
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  item: {
    width: "100%",
    justifyContent: "flex-start",
    textAlign: "start",
    fontWeight: tokens.fontWeightRegular,
    minWidth: 0,
    gap: tokens.spacingHorizontalS,
  },
  // The method badge, in a column of its own so the titles line up.
  badge: { flexShrink: 0, width: "3.25rem", display: "flex" },
  itemText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
  },
  itemTitle: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  route: {
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyMonospace,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  group: { margin: 0, marginTop: tokens.spacingVerticalS },
  historyItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
  },
  muted: { color: tokens.colorNeutralForeground3 },
});

const SHOWN = 50;

export type PickerTab = "samples" | "operations" | "history";

const KIND_LABEL: Record<OperationKind, string> = {
  actions: "Actions",
  functions: "Functions",
  messages: "Messages",
};

interface OperationPickerProps {
  tab: PickerTab;
  onTabChange: (tab: PickerTab) => void;
  onSample: (sample: Sample) => void;
  onOperation: (op: CatalogOperation) => void;
  history: HistoryEntry[];
  onHistory: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

function matches(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

function SampleList({ onSample }: { onSample: (s: Sample) => void }) {
  const styles = useStyles();
  const [query, setQuery] = useState("");
  const shown = SAMPLES.filter((s) => matches(`${s.group} ${s.title}`, query));
  return (
    <div className={styles.panel}>
      <SearchBox
        aria-label="Search the samples"
        placeholder="Search the samples"
        value={query}
        onChange={(_, d) => setQuery(d.value)}
      />
      {SAMPLE_GROUPS.map((group) => {
        const items = shown.filter((s) => s.group === group);
        if (!items.length) return null;
        return (
          <section key={group} aria-label={group}>
            <Text as="h3" size={200} weight="semibold" className={styles.group}>
              {group}
            </Text>
            <ul className={styles.list}>
              {items.map((s) => (
                <li key={s.id}>
                  <Button
                    appearance="subtle"
                    className={styles.item}
                    onClick={() => onSample(s)}
                    data-sample={s.id}
                  >
                    <span className={styles.badge}>
                      <MethodBadge method={sampleMethod(s)} />
                    </span>
                    <span className={styles.itemTitle}>{s.title}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {!shown.length && <Caption1 className={styles.muted}>No sample matches.</Caption1>}
    </div>
  );
}

function OperationList({ onOperation }: { onOperation: (op: CatalogOperation) => void }) {
  const styles = useStyles();
  const [kind, setKind] = useState<OperationKind>("functions");
  const [query, setQuery] = useState("");
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "loaded"; kind: OperationKind; operations: CatalogOperation[] }
    | { status: "failed"; error: unknown }
  >({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    loadCatalog(kind).then(
      (operations) => !cancelled && setState({ status: "loaded", kind, operations }),
      (error: unknown) => !cancelled && setState({ status: "failed", error })
    );
    return () => {
      cancelled = true;
    };
  }, [kind]);

  const found = useMemo(
    () =>
      state.status === "loaded"
        ? state.operations.filter((op) => matches(`${op.className} ${op.route}`, query))
        : [],
    [state, query]
  );

  return (
    <div className={styles.panel}>
      <Field label="Package">
        <Select value={kind} onChange={(_, d) => setKind(d.value as OperationKind)}>
          {OPERATION_KINDS.map((k) => (
            <option key={k} value={k}>
              {KIND_LABEL[k]}
            </option>
          ))}
        </Select>
      </Field>
      <SearchBox
        aria-label={`Search the ${KIND_LABEL[kind].toLowerCase()}`}
        placeholder={`Search the ${KIND_LABEL[kind].toLowerCase()}`}
        value={query}
        onChange={(_, d) => setQuery(d.value)}
      />
      {state.status === "loading" && <Spinner size="small" label="Loading the operations…" />}
      {state.status === "failed" && <ErrorCard error={state.error} />}
      {state.status === "loaded" && (
        <>
          <Caption1 className={styles.muted} role="status">
            {found.length === state.operations.length
              ? `${found.length} ${KIND_LABEL[kind].toLowerCase()}`
              : `${found.length} of ${state.operations.length} match`}
            {found.length > SHOWN ? `; showing the first ${SHOWN}` : ""}
          </Caption1>
          <ul className={styles.list}>
            {found.slice(0, SHOWN).map((op) => (
              <li key={op.className}>
                <Button
                  appearance="subtle"
                  className={styles.item}
                  onClick={() => onOperation(op)}
                  title={`${op.method} ${op.route}`}
                >
                  <span className={styles.badge}>
                    <MethodBadge method={op.method} />
                  </span>
                  <span className={styles.itemText}>
                    <span className={styles.itemTitle}>{op.className}</span>
                    <Caption1 className={styles.route}>{op.route}</Caption1>
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function HistoryList({
  history,
  onHistory,
  onClear,
}: {
  history: HistoryEntry[];
  onHistory: (e: HistoryEntry) => void;
  onClear: () => void;
}) {
  const styles = useStyles();
  if (!history.length) {
    return (
      <Caption1 className={styles.muted}>
        Requests you run appear here. They are kept in this browser only.
      </Caption1>
    );
  }
  return (
    <div className={styles.panel}>
      <ul className={styles.list} aria-label="History">
        {history.map((e) => (
          <li key={e.id} className={styles.historyItem}>
            <Button appearance="subtle" className={styles.item} onClick={() => onHistory(e)}>
              <span className={styles.badge}>
                <MethodBadge method={e.method} />
              </span>
              <span className={styles.itemText}>
                <span className={styles.itemTitle}>{e.title}</span>
                <Caption1 className={styles.route}>
                  {new Date(e.at).toLocaleTimeString()} · {e.environmentHost}
                </Caption1>
              </span>
            </Button>
            {e.status !== undefined && <StatusBadge status={e.status} />}
          </li>
        ))}
      </ul>
      <Button icon={<DeleteRegular />} onClick={onClear}>
        Clear the history
      </Button>
    </div>
  );
}

/** The explorer's left panel: sample queries, the operation catalogs, and history. */
export function OperationPicker(props: OperationPickerProps) {
  const styles = useStyles();
  const { tab, onTabChange } = props;
  return (
    <div className={styles.root}>
      <TabList
        selectedValue={tab}
        onTabSelect={(_, d) => onTabChange(d.value as PickerTab)}
        aria-label="Pick a request"
        size="small"
      >
        <Tab value="samples">Samples</Tab>
        <Tab value="operations">Operations</Tab>
        <Tab value="history">History</Tab>
      </TabList>
      <div
        role="tabpanel"
        aria-label={tab === "samples" ? "Samples" : tab === "operations" ? "Operations" : "History"}
      >
        {tab === "samples" && <SampleList onSample={props.onSample} />}
        {tab === "operations" && <OperationList onOperation={props.onOperation} />}
        {tab === "history" && (
          <HistoryList
            history={props.history}
            onHistory={props.onHistory}
            onClear={props.onClearHistory}
          />
        )}
      </div>
    </div>
  );
}
