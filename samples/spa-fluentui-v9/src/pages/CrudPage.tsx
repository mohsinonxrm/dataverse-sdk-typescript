import { useState } from "react";
import { Field, Input, SpinButton } from "@fluentui/react-components";
import { RecordsGrid } from "../components/RecordsGrid";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { spinValue } from "../lib/fields";
import { snippet } from "../lib/snippet";
import * as crud from "../scenarios/crud";
import source from "../scenarios/crud.ts?raw";
import type { Account } from "../scenarios/types";

const columns = [
  { key: "name", label: "Name" },
  { key: "address1_city", label: "City" },
  { key: "revenue", label: "Revenue" },
  { key: "statecode", label: "Status" },
  { key: "modifiedon", label: "Modified" },
];

function AccountFields(props: {
  name: string;
  city: string;
  revenue: number;
  onName: (v: string) => void;
  onCity: (v: string) => void;
  onRevenue: (v: number) => void;
}) {
  return (
    <>
      <Field label="Name" required>
        <Input value={props.name} onChange={(_, d) => props.onName(d.value)} />
      </Field>
      <Field label="City">
        <Input value={props.city} onChange={(_, d) => props.onCity(d.value)} />
      </Field>
      <Field label="Revenue">
        <SpinButton
          value={props.revenue}
          min={0}
          step={10_000}
          onChange={(_, d) => props.onRevenue(spinValue(d, 0))}
        />
      </Field>
    </>
  );
}

export default function CrudPage() {
  const [name, setName] = useState("Contoso Coffee");
  const [city, setCity] = useState("Seattle");
  const [revenue, setRevenue] = useState(250_000);
  const [id, setId] = useState("");
  const [newName, setNewName] = useState("Contoso Coffee Roasters");
  const [newCity, setNewCity] = useState("Redmond");
  const [newRevenue, setNewRevenue] = useState(300_000);
  const needsRecord = id ? undefined : "Create a record first, or paste an account id.";

  return (
    <ScenarioPage
      title="Create, read, update, delete"
      description="The four writes and reads of one account with the request builder. Create fills in the id the other scenarios use."
    >
      <Scenario
        title="Create"
        description="createAndGetId() posts the record and reads the new id from the OData-EntityId header."
        code={snippet(source, "create")}
        run={(sdk, signal) => crud.createAccount(sdk, { name, city, revenue }, signal)}
        onResult={setId}
        successMessage={() => "Account created"}
        renderResult={(newId) => <>New account id: {newId}</>}
      >
        <AccountFields
          name={name}
          city={city}
          revenue={revenue}
          onName={setName}
          onCity={setCity}
          onRevenue={setRevenue}
        />
      </Scenario>

      <Scenario
        title="Read"
        description="One record by id, with formatted values."
        code={snippet(source, "read")}
        run={(sdk, signal) => crud.readAccount(sdk, { id }, signal)}
        disabledReason={needsRecord}
        renderResult={(account) => (
          <RecordsGrid<Account>
            label="Account"
            rows={[account]}
            getRowId={(a) => a.accountid}
            columns={columns}
          />
        )}
      >
        <Field label="Account id">
          <Input
            value={id}
            onChange={(_, d) => setId(d.value.trim())}
            placeholder="Create a record first"
          />
        </Field>
      </Scenario>

      <Scenario
        title="Update"
        description="A PATCH that only updates: If-Match: * makes it fail with 404 instead of creating a record."
        code={snippet(source, "update")}
        run={(sdk, signal) =>
          crud.updateAccount(sdk, { id, name: newName, city: newCity, revenue: newRevenue }, signal)
        }
        disabledReason={needsRecord}
        renderResult={(account) => (
          <RecordsGrid<Account>
            label="Updated account"
            rows={[account]}
            getRowId={(a) => a.accountid}
            columns={columns}
          />
        )}
      >
        <AccountFields
          name={newName}
          city={newCity}
          revenue={newRevenue}
          onName={setNewName}
          onCity={setNewCity}
          onRevenue={setNewRevenue}
        />
      </Scenario>

      <Scenario
        title="Delete"
        description="Deletes the record. It asks first."
        code={snippet(source, "delete")}
        run={(sdk, signal) => crud.deleteAccount(sdk, { id }, signal)}
        disabledReason={needsRecord}
        confirm={{
          title: "Delete this account?",
          body: `The account ${id} is deleted permanently.`,
          confirmLabel: "Delete",
        }}
        onResult={() => setId("")}
        successMessage={() => "Account deleted"}
      />
    </ScenarioPage>
  );
}
