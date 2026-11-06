import { useState } from "react";
import { Field, Input, SpinButton } from "@fluentui/react-components";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { spinValue } from "../lib/fields";
import { snippet } from "../lib/snippet";
import * as batch from "../scenarios/batch";
import source from "../scenarios/batch.ts?raw";

export default function BatchPage() {
  const [accountName, setAccountName] = useState("Batch Bikes");
  const [requests, setRequests] = useState(25);
  const [batchSize, setBatchSize] = useState(10);

  return (
    <ScenarioPage
      title="$batch"
      description="BatchRequestBuilder sends many requests in one $batch: change sets that run as one transaction, continueOnError to run everything and collect the failures, and automatic splitting of large batches. Open a $batch request below to see the multipart body."
    >
      <Scenario
        title="A change set"
        description="An account and a contact that refers to it by Content-ID, created in one transaction, then a read outside the change set. The records are deleted afterwards in a second batch."
        code={snippet(source, "changeset")}
        run={(sdk) => batch.createInOneTransaction(sdk, { accountName })}
      >
        <Field label="Account name">
          <Input value={accountName} onChange={(_, d) => setAccountName(d.value)} />
        </Field>
      </Scenario>

      <Scenario
        title="continueOnError"
        description="Three reads, the second of a record that doesn't exist. Every request runs, and execute() returns the failure in result.errors instead of throwing."
        code={snippet(source, "continue-on-error")}
        run={(sdk) => batch.continueOnError(sdk)}
      />

      <Scenario
        title="Automatic splitting"
        description="More requests than batchSize are sent as several $batch requests (see Requests). Dataverse allows at most 1000 per batch, which is the default."
        code={snippet(source, "auto-split")}
        run={(sdk) => batch.autoSplit(sdk, { requests, batchSize })}
      >
        <Field label="Requests">
          <SpinButton
            value={requests}
            min={1}
            max={200}
            onChange={(_, d) => setRequests(spinValue(d, 25))}
          />
        </Field>
        <Field label="batchSize">
          <SpinButton
            value={batchSize}
            min={1}
            max={1000}
            onChange={(_, d) => setBatchSize(spinValue(d, 10))}
          />
        </Field>
      </Scenario>
    </ScenarioPage>
  );
}
