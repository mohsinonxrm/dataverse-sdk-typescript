import { useEffect, useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Button,
  Caption1,
  Caption1Strong,
  Field,
  List,
  ListItem,
  makeStyles,
  SearchBox,
  Select,
  Spinner,
  Tab,
  TabList,
  tokens,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { ErrorCard } from "../../components/ErrorCard";
import { MethodBadge, StatusBadge } from "../../components/StatusBadge";
import { useTabs } from "../../components/tabs";
import { loadCatalog } from "../catalog/load";
import type { HistoryEntry } from "../history";
import { SAMPLE_GROUPS, SAMPLES, sampleMethod, type Sample } from "../samples";
import { OPERATION_KINDS, type CatalogOperation, type OperationKind } from "../types";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, minWidth: 0 },
  panel: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, minWidth: 0 },
  list: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  // A list item that looks like a subtle button: hover and selected backgrounds from the subtle
  // tokens, the selected one's title in semibold (which shows in forced colours too).
  item: {
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    minHeight: "32px",
    paddingBlock: tokens.spacingVerticalXS,
    paddingInline: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ":active": { backgroundColor: tokens.colorSubtleBackgroundPressed },
    '&[aria-selected="true"]': {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
      color: tokens.colorNeutralForeground1Selected,
      fontWeight: tokens.fontWeightSemibold,
    },
  },
  // The method badge, in a column of its own so the titles line up.
  badge: { flexShrink: 0, width: "3.25rem", display: "flex" },
  itemText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
  },
  itemTitle: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  route: {
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyMonospace,
    fontWeight: tokens.fontWeightRegular,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  group: { margin: 0, marginTop: tokens.spacingVerticalS },
  muted: { color: tokens.colorNeutralForeground3 },
});

const SHOWN = 50;

export type PickerTab = "samples" | "operations" | "history";

const KIND_LABEL: Record<OperationKind, string> = {
  actions: "Actions",
  functions: "Functions",
  messages: "Messages",
};

/** The list item values (also their element ids) of what the picker offers. */
export const pickedSample = (id: string) => `sample-${id}`;
export const pickedOperation = (op: Pick<CatalogOperation, "kind" | "name">) =>
  `operation-${op.kind}-${op.name}`;
export const pickedHistory = (id: string) => `history-${id}`;

interface OperationPickerProps {
  tab: PickerTab;
  onTabChange: (tab: PickerTab) => void;
  /** The value of the item chosen last (`pickedSample` and so on), shown as selected. */
  picked?: string;
  onSample: (sample: Sample) => void;
  onOperation: (op: CatalogOperation) => void;
  history: HistoryEntry[];
  onHistory: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

function matches(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

/**
 * A Fluent `List` to pick from: a single-selection listbox where the arrow keys move between the
 * items, Enter, Space or a click chooses one, and Tab leaves the list. The chosen item is the
 * selected one.
 */
function PickList<T>({
  items,
  keyOf,
  picked,
  onPick,
  render,
  itemProps,
  ...rest
}: {
  items: T[];
  keyOf: (item: T) => string;
  picked?: string;
  onPick: (item: T) => void;
  render: (item: T) => ReactNode;
  itemProps?: (item: T) => Record<string, string>;
} & ({ "aria-label": string } | { "aria-labelledby": string })) {
  const styles = useStyles();
  const byValue = new Map(items.map((item) => [keyOf(item), item]));
  const pick = (value: string | number | undefined) => {
    const item = value === undefined ? undefined : byValue.get(String(value));
    if (item !== undefined) onPick(item);
  };
  return (
    <List
      {...rest}
      className={styles.list}
      navigationMode="items"
      selectionMode="single"
      selectedItems={picked && byValue.has(picked) ? [picked] : []}
      // Space selects (the list's own behaviour): that picks the item too.
      onSelectionChange={(_, data) => pick(data.selectedItems[0])}
    >
      {items.map((item) => {
        const value = keyOf(item);
        return (
          <ListItem
            key={value}
            value={value}
            className={styles.item}
            checkmark={null}
            // Click and Enter. Handled here, so the list doesn't also toggle the selection.
            onAction={(e) => {
              e.preventDefault();
              pick(value);
            }}
            {...itemProps?.(item)}
          >
            {render(item)}
          </ListItem>
        );
      })}
    </List>
  );
}

function SampleList({ onSample, picked }: { onSample: (s: Sample) => void; picked?: string }) {
  const styles = useStyles();
  const id = useId();
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
      {SAMPLE_GROUPS.map((group, index) => {
        const items = shown.filter((s) => s.group === group);
        if (!items.length) return null;
        const headingId = `${id}-group-${index}`;
        return (
          <div key={group}>
            <Caption1Strong as="h3" id={headingId} className={styles.group}>
              {group}
            </Caption1Strong>
            <PickList
              aria-labelledby={headingId}
              items={items}
              keyOf={(s) => pickedSample(s.id)}
              picked={picked}
              onPick={onSample}
              itemProps={(s) => ({ "data-sample": s.id })}
              render={(s) => (
                <>
                  <span className={styles.badge}>
                    <MethodBadge method={sampleMethod(s)} />
                  </span>
                  <span className={styles.itemTitle}>{s.title}</span>
                </>
              )}
            />
          </div>
        );
      })}
      {!shown.length && <Caption1 className={styles.muted}>No sample matches.</Caption1>}
    </div>
  );
}

function OperationList({
  onOperation,
  picked,
}: {
  onOperation: (op: CatalogOperation) => void;
  picked?: string;
}) {
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
          <PickList
            aria-label={KIND_LABEL[kind]}
            items={found.slice(0, SHOWN)}
            keyOf={pickedOperation}
            picked={picked}
            onPick={onOperation}
            itemProps={(op) => ({ title: `${op.method} ${op.route}` })}
            render={(op) => (
              <>
                <span className={styles.badge}>
                  <MethodBadge method={op.method} />
                </span>
                <span className={styles.itemText}>
                  <span className={styles.itemTitle}>{op.className}</span>
                  <Caption1 className={styles.route}>{op.route}</Caption1>
                </span>
              </>
            )}
          />
        </>
      )}
    </div>
  );
}

function HistoryList({
  history,
  picked,
  onHistory,
  onClear,
}: {
  history: HistoryEntry[];
  picked?: string;
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
      <PickList
        aria-label="History"
        items={history}
        keyOf={(e) => pickedHistory(e.id)}
        picked={picked}
        onPick={onHistory}
        render={(e) => (
          <>
            <span className={styles.badge}>
              <MethodBadge method={e.method} />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>{e.title}</span>
              <Caption1 className={styles.route}>
                {new Date(e.at).toLocaleTimeString()} · {e.environmentHost}
              </Caption1>
            </span>
            {e.status !== undefined && <StatusBadge status={e.status} />}
          </>
        )}
      />
      <Button icon={<DeleteRegular />} onClick={onClear}>
        Clear the history
      </Button>
    </div>
  );
}

/** The explorer's left panel: sample queries, the operation catalogs, and history. */
export function OperationPicker(props: OperationPickerProps) {
  const styles = useStyles();
  const { tab, onTabChange, picked } = props;
  const tabs = useTabs(tab, onTabChange, "Pick a request");
  return (
    <div className={styles.root}>
      <TabList {...tabs.list}>
        <Tab {...tabs.tab("samples")}>Samples</Tab>
        <Tab {...tabs.tab("operations")}>Operations</Tab>
        <Tab {...tabs.tab("history")}>History</Tab>
      </TabList>
      <div {...tabs.panel}>
        {tab === "samples" && <SampleList onSample={props.onSample} picked={picked} />}
        {tab === "operations" && <OperationList onOperation={props.onOperation} picked={picked} />}
        {tab === "history" && (
          <HistoryList
            history={props.history}
            picked={picked}
            onHistory={props.onHistory}
            onClear={props.onClearHistory}
          />
        )}
      </div>
    </div>
  );
}
