import { useState } from "react";
import { Dropdown, Field, Input, Option } from "@fluentui/react-components";
import { RecordsGrid } from "../components/RecordsGrid";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import type { SystemUser } from "../scenarios/types";
import * as writes from "../scenarios/writes";
import source from "../scenarios/writes.ts?raw";

export default function ImpersonationPage() {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [objectId, setObjectId] = useState("");

  return (
    <ScenarioPage
      title="Impersonation"
      description="impersonateByObjectId() sends the CallerObjectId header, so the request runs as another user: their privileges apply, and records show them as creator. You need the prvActOnBehalfOfAnotherUser privilege (the Delegate role). impersonate(systemuserid) does the same with MSCRMCallerID."
    >
      <Scenario
        title="List users"
        description="Enabled users with a Microsoft Entra object id. This fills the list of the next scenario."
        code={snippet(source, "list-users")}
        run={(sdk, signal) => writes.listUsers(sdk, signal)}
        onResult={(list) => {
          setUsers(list);
          if (!objectId)
            setObjectId(
              list[1]?.azureactivedirectoryobjectid ?? list[0]?.azureactivedirectoryobjectid ?? ""
            );
        }}
        renderResult={(list) => (
          <RecordsGrid<SystemUser>
            label="Users"
            rows={list}
            getRowId={(u) => u.systemuserid}
            columns={[
              { key: "fullname", label: "Name" },
              { key: "internalemailaddress", label: "Email" },
              { key: "azureactivedirectoryobjectid", label: "Entra object id" },
            ]}
          />
        )}
      />
      <Scenario
        title="Act as another user"
        description="WhoAmI as that user, then a create on their behalf. The account is deleted afterwards."
        code={snippet(source, "impersonate")}
        run={(sdk, signal) => writes.actAs(sdk, { objectId }, signal)}
        disabledReason={objectId ? undefined : "List the users first, or paste an object id."}
      >
        <Field label="User">
          <Dropdown
            placeholder="List the users first"
            disabled={!users.length}
            value={users.find((u) => u.azureactivedirectoryobjectid === objectId)?.fullname ?? ""}
            selectedOptions={objectId ? [objectId] : []}
            onOptionSelect={(_, d) => setObjectId(d.optionValue ?? "")}
          >
            {users.map((u) => (
              <Option key={u.systemuserid} value={u.azureactivedirectoryobjectid ?? ""}>
                {u.fullname ?? u.systemuserid}
              </Option>
            ))}
          </Dropdown>
        </Field>
        <Field label="Entra object id">
          <Input value={objectId} onChange={(_, d) => setObjectId(d.value.trim())} />
        </Field>
      </Scenario>
    </ScenarioPage>
  );
}
