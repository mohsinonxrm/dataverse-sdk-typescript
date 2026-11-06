import { useState } from "react";
import {
  Badge,
  Body1,
  Button,
  Caption1,
  Dropdown,
  Field,
  Input,
  makeStyles,
  Option,
  SearchBox,
  tokens,
} from "@fluentui/react-components";
import { RecordsGrid } from "../components/RecordsGrid";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import * as metadata from "../scenarios/metadata";
import source from "../scenarios/metadata.ts?raw";

const useStyles = makeStyles({
  tables: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  search: { maxWidth: "24rem" },
  muted: { color: tokens.colorNeutralForeground3 },
});

type Table = Awaited<ReturnType<typeof metadata.listTables>>[number];

const SHOWN = 50;

function TablesResult({
  tables,
  onPick,
}: {
  tables: Table[];
  onPick: (logicalName: string) => void;
}) {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  const matches = tables.filter(
    (t) => !term || t.logicalName.includes(term) || t.displayName.toLowerCase().includes(term)
  );
  return (
    <div className={styles.tables}>
      <Body1>{tables.length} tables.</Body1>
      <SearchBox
        className={styles.search}
        placeholder="Filter by name"
        aria-label="Filter tables"
        value={search}
        onChange={(_, d) => setSearch(d.value)}
      />
      <RecordsGrid<Table>
        label="Tables"
        rows={matches.slice(0, SHOWN)}
        getRowId={(t) => t.logicalName}
        columns={[
          { key: "logicalName", label: "Logical name" },
          { key: "displayName", label: "Display name" },
          { key: "entitySetName", label: "Entity set" },
          { key: "ownership", label: "Ownership" },
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
          {
            key: "browse",
            label: "",
            render: (t) => (
              <Button size="small" appearance="subtle" onClick={() => onPick(t.logicalName)}>
                Browse columns
              </Button>
            ),
          },
        ]}
      />
      {matches.length > SHOWN && (
        <Caption1 className={styles.muted}>
          Showing {SHOWN} of {matches.length}. Filter to narrow the list.
        </Caption1>
      )}
    </div>
  );
}

const CASTS = {
  choice: { label: "Choice (PicklistAttributeMetadata)", region: "picklist-cast" },
  text: { label: "Text (StringAttributeMetadata)", region: "string-cast" },
  lookup: { label: "Lookup (LookupAttributeMetadata)", region: "lookup-cast" },
} as const;
type CastKind = keyof typeof CASTS;

async function runCast(kind: CastKind, ...args: Parameters<typeof metadata.choiceColumns>) {
  if (kind === "choice") {
    const rows = await metadata.choiceColumns(...args);
    return rows.map((r) => ({ logicalName: r.logicalName, detail: r.options.join(", ") }));
  }
  if (kind === "text") {
    const rows = await metadata.textColumns(...args);
    return rows.map((r) => ({
      logicalName: r.logicalName,
      detail: `MaxLength ${r.maxLength ?? "?"}`,
    }));
  }
  const rows = await metadata.lookupColumns(...args);
  return rows.map((r) => ({ logicalName: r.logicalName, detail: r.targets.join(", ") }));
}

export default function MetadataPage() {
  const [table, setTable] = useState("account");
  const [cast, setCast] = useState<CastKind>("choice");

  return (
    <ScenarioPage
      title="Metadata browser"
      description="MetadataClient reads table and column definitions. A cast (Microsoft.Dynamics.CRM.<Type>AttributeMetadata) reads one kind of column with its type-specific properties, typed to match."
    >
      <Scenario
        title="Tables"
        description="Every table, with its display name, entity set and ownership. Pick one to browse its columns below."
        code={snippet(source, "tables")}
        run={(sdk) => metadata.listTables(sdk)}
        renderResult={(tables) => <TablesResult tables={tables} onPick={setTable} />}
      />
      <Scenario
        title="Columns"
        description="The columns of a table, with their type and requirement level."
        code={snippet(source, "columns")}
        run={(sdk) => metadata.listColumns(sdk, { table })}
        disabledReason={table ? undefined : "Enter a table's logical name."}
        renderResult={(rows) => (
          <RecordsGrid
            label={`Columns of ${table}`}
            rows={rows}
            getRowId={(c) => c.logicalName}
            columns={[
              { key: "logicalName", label: "Logical name" },
              { key: "displayName", label: "Display name" },
              { key: "type", label: "Type" },
              { key: "required", label: "Required" },
            ]}
          />
        )}
      >
        <Field label="Table (logical name)">
          <Input value={table} onChange={(_, d) => setTable(d.value.trim().toLowerCase())} />
        </Field>
      </Scenario>
      <Scenario
        title="Typed casts"
        description="Choice columns with their options, text columns with MaxLength, or lookups with their target tables. The code changes with the column type you pick."
        code={snippet(source, CASTS[cast].region)}
        run={(sdk) => runCast(cast, sdk, { table })}
        disabledReason={table ? undefined : "Enter a table's logical name."}
        renderResult={(rows) => (
          <RecordsGrid
            label={`${CASTS[cast].label} columns of ${table}`}
            rows={rows}
            getRowId={(c) => c.logicalName}
            columns={[
              { key: "logicalName", label: "Column" },
              {
                key: "detail",
                label: cast === "choice" ? "Options" : cast === "text" ? "Length" : "Targets",
              },
            ]}
          />
        )}
      >
        <Field label="Table (logical name)">
          <Input value={table} onChange={(_, d) => setTable(d.value.trim().toLowerCase())} />
        </Field>
        <Field label="Column type">
          <Dropdown
            value={CASTS[cast].label}
            selectedOptions={[cast]}
            onOptionSelect={(_, d) => setCast((d.optionValue as CastKind | undefined) ?? cast)}
          >
            {(Object.keys(CASTS) as CastKind[]).map((k) => (
              <Option key={k} value={k}>
                {CASTS[k].label}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </Scenario>
    </ScenarioPage>
  );
}
