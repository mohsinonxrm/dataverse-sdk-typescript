import { useState } from "react";
import { Body1, Field, Input } from "@fluentui/react-components";
import { RecordsGrid } from "../components/RecordsGrid";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import * as operations from "../scenarios/operations";
import source from "../scenarios/operations.ts?raw";

export default function OperationsPage() {
  const [tables, setTables] = useState("account, contact");
  const [table, setTable] = useState("account");

  return (
    <ScenarioPage
      title="Actions, functions and messages"
      description="The prebuilt packages wrap each Dataverse function (a GET) and action (a POST) of the platform, Sales and Customer Service in a typed class: @mohsinonxrm/dataverse-sdk-functions and -actions run with client.execute(), and -messages are the C# SDK's Request classes for OrganizationService.execute(). Other apps' operations and your custom APIs are generated from your org with dataverse-gen."
    >
      <Scenario
        title="Functions: RetrieveVersion and RetrieveTotalRecordCount"
        description="Function parameters are sent as OData parameter aliases (look at the URL below)."
        code={snippet(source, "functions")}
        run={(sdk, signal) =>
          operations.counts(
            sdk,
            {
              tables: tables
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            },
            signal
          )
        }
        renderResult={(r) => (
          <>
            <Body1>Dataverse {r.version}</Body1>
            <RecordsGrid
              label="Record counts"
              rows={r.counts}
              getRowId={(c) => c.table}
              columns={[
                { key: "table", label: "Table" },
                { key: "records", label: "Records" },
              ]}
            />
          </>
        )}
      >
        <Field label="Tables (logical names, comma-separated)">
          <Input value={tables} onChange={(_, d) => setTables(d.value)} />
        </Field>
      </Scenario>

      <Scenario
        title="InitializeFrom"
        description="A new contact pre-filled from an account through the table mapping, then created (and deleted). The EntityMoniker parameter is an entity reference from createEntityReference()."
        code={snippet(source, "initialize-from")}
        run={(sdk, signal) => operations.newContactFromAccount(sdk, signal)}
      />

      <Scenario
        title="An action, a message and a generic request"
        description="CanManyToMany from the actions package, CanBeReferencedRequest from the messages package, and OrganizationRequest for any action or custom API without a generated class."
        code={snippet(source, "actions-messages")}
        run={(sdk) => operations.relationshipChecks(sdk, { table })}
      >
        <Field label="Table (logical name)">
          <Input value={table} onChange={(_, d) => setTable(d.value.trim().toLowerCase())} />
        </Field>
      </Scenario>
    </ScenarioPage>
  );
}
