import { useState } from "react";
import {
  Body1,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  makeStyles,
  SpinButton,
  Subtitle1,
} from "@fluentui/react-components";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { spinValue } from "../lib/fields";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import * as errors from "../scenarios/errors";
import source from "../scenarios/errors.ts?raw";

const useStyles = makeStyles({
  card: { alignItems: "flex-start" },
});

function Thrower(): never {
  throw new Error("This component threw while rendering.");
}

function BoundaryDemo() {
  const styles = useStyles();
  const [broken, setBroken] = useState(false);
  return (
    <Card size="large" className={styles.card} role="region" aria-labelledby="boundary-heading">
      <CardHeader
        header={
          <Subtitle1 as="h2" id="boundary-heading">
            ErrorBoundary
          </Subtitle1>
        }
        description={
          <Body1>
            Errors thrown while rendering are caught by an error boundary around each page, so one
            failing page shows a card with a way to recover instead of a blank app. Try it here with
            a boundary around this card only.
          </Body1>
        }
      />
      <ErrorBoundary key={String(broken)} title="This card failed to render.">
        {broken ? (
          <Thrower />
        ) : (
          <Button onClick={() => setBroken(true)}>Throw during render</Button>
        )}
      </ErrorBoundary>
      {broken && <Button onClick={() => setBroken(false)}>Reset the demo</Button>}
    </Card>
  );
}

export default function ErrorsPage() {
  const [filter, setFilter] = useState("name eq");
  const [id, setId] = useState("00000000-0000-0000-0000-000000000001");
  const [retryAfter, setRetryAfter] = useState(1);
  const [timeoutMs, setTimeoutMs] = useState(1);

  return (
    <ScenarioPage
      title="Error handling"
      description="Every error the SDK throws extends DataverseError, with a class per kind of failure. These scenarios cause each one; the card under Result is chosen by the error's class."
    >
      <Scenario
        failsOnPurpose
        title="OData error (400)"
        description="An invalid $filter. Dataverse answers with an OData error, thrown as DataverseODataError."
        code={snippet(source, "odata-error")}
        run={(sdk, signal) => errors.invalidFilter(sdk, { filter }, signal)}
      >
        <Field label="$filter">
          <Input value={filter} onChange={(_, d) => setFilter(d.value)} />
        </Field>
      </Scenario>

      <Scenario
        failsOnPurpose
        title="Record not found (404)"
        description="Reading a record that doesn't exist."
        code={snippet(source, "not-found")}
        run={(sdk, signal) => errors.missingRecord(sdk, { id }, signal)}
      >
        <Field label="Account id">
          <Input value={id} onChange={(_, d) => setId(d.value)} />
        </Field>
      </Scenario>

      <Scenario
        title="Throttling (429)"
        description="A service protection limit. With a Retry-After up to retry.maxRetryAfterMs the SDK waits and retries (see the retry in Requests); with a longer one it throws DataverseThrottleError with retryAfterMs. Try 1 and then 30 seconds."
        code={snippet(source, "throttle")}
        run={(sdk, signal) => errors.throttled(sdk, { retryAfterSeconds: retryAfter }, signal)}
      >
        <Field label="Retry-After (seconds)" hint="Up to 5 is retried, more is thrown.">
          <SpinButton
            value={retryAfter}
            min={0}
            max={300}
            onChange={(_, d) => setRetryAfter(spinValue(d, 0))}
          />
        </Field>
      </Scenario>

      <Scenario
        failsOnPurpose
        title="Network failure"
        description="fetch() itself fails, as it does offline or when CORS blocks a request: the GET is retried, then DataverseNetworkError."
        code={snippet(source, "network")}
        run={(sdk, signal) => errors.offline(sdk, signal)}
      />

      <Scenario
        failsOnPurpose
        title="Timeout"
        description="timeoutMs is a deadline for the whole request, including retries."
        code={snippet(source, "timeout")}
        run={(sdk, signal) => errors.timeout(sdk, { timeoutMs }, signal)}
      >
        <Field label="timeoutMs">
          <SpinButton
            value={timeoutMs}
            min={1}
            max={60_000}
            onChange={(_, d) => setTimeoutMs(spinValue(d, 1))}
          />
        </Field>
      </Scenario>

      <Scenario
        failsOnPurpose
        title="Abort"
        description="An AbortSignal cancels the request. The Cancel button of every scenario does the same."
        code={snippet(source, "abort")}
        run={(sdk, signal) => errors.aborted(sdk, signal)}
      />

      <Scenario
        failsOnPurpose
        title="Token kept to its origin"
        description="A request for another origin is refused before it is sent, so the bearer token never leaves your environment."
        code={snippet(source, "foreign-origin")}
        run={(sdk, signal) => errors.foreignOrigin(sdk, signal)}
      />

      <Scenario
        failsOnPurpose
        title="Failed change set"
        description="A $batch change set whose second request fails: the first is rolled back and DataverseBatchError reports each request."
        code={snippet(source, "batch-error")}
        run={(sdk) => errors.failedChangeset(sdk)}
      />

      <BoundaryDemo />
    </ScenarioPage>
  );
}
