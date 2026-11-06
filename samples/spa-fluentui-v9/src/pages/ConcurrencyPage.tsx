import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import * as writes from "../scenarios/writes";
import source from "../scenarios/writes.ts?raw";

export default function ConcurrencyPage() {
  return (
    <ScenarioPage
      title="Optimistic concurrency"
      description="Every record has an ETag that changes with each update. ifMatch(etag) makes an update conditional: when someone changed the record since you read it, Dataverse answers 412 Precondition Failed instead of overwriting their change. Both scenarios create a record and delete it afterwards."
    >
      <Scenario
        failsOnPurpose
        title="A stale update is refused (412)"
        description="Read, let someone else update, then update with the old ETag. The result is the 412, as a DataverseODataError."
        code={snippet(source, "concurrency")}
        run={(sdk, signal) => writes.staleUpdate(sdk, signal)}
      />
      <Scenario
        title="Read, modify, write, and retry on 412"
        description="The usual way to handle a 412: read the current values and ETag again and reapply the change."
        code={snippet(source, "concurrency-retry")}
        run={(sdk, signal) => writes.updateWithRetry(sdk, signal)}
      />
    </ScenarioPage>
  );
}
