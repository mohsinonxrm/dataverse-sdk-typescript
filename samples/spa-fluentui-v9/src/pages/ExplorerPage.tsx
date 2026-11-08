import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Body1,
  Button,
  Caption1,
  Card,
  Field,
  Input,
  makeStyles,
  MessageBar,
  MessageBarBody,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Subtitle1,
  Tab,
  TabList,
  Text,
  Textarea,
  tokens,
} from "@fluentui/react-components";
import { ArrowSwapRegular, DismissRegular, PlayRegular } from "@fluentui/react-icons";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { useSearchParams } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { ErrorCard } from "../components/ErrorCard";
import { JsonView } from "../components/JsonView";
import { HeaderList, RequestInspector } from "../components/RequestInspector";
import { ScenarioPage } from "../components/ScenarioPage";
import { MethodBadge, StatusBadge } from "../components/StatusBadge";
import { loadCatalog, loadPackage } from "../explorer/catalog/load";
import { operationCode, rawCode } from "../explorer/codegen";
import { OperationPicker, type PickerTab } from "../explorer/components/OperationPicker";
import { ParameterForm } from "../explorer/components/ParameterForm";
import {
  addToHistory,
  clearHistory,
  readHistory,
  type HistoryEntry,
  type HistoryRequest,
} from "../explorer/history";
import {
  fluentPlan,
  instantiate,
  runOperation,
  type OperationPackage,
} from "../explorer/operations";
import { httpText, previewRequests, type PreviewResult } from "../explorer/preview";
import {
  parseRawRequest,
  rawInputFromRequestInformation,
  runRawPlan,
} from "../explorer/rawRequest";
import { SAMPLES, type Sample } from "../explorer/samples";
import {
  HTTP_METHODS,
  OPERATION_KINDS,
  PACKAGE_OF,
  type CatalogOperation,
  type CodeFlavour,
  type HttpMethod,
  type OperationInput,
  type OperationKind,
  type RawRequestInput,
} from "../explorer/types";
import { draftValues, type ValueError } from "../explorer/values";
import { useRun } from "../hooks/useRun";
import type { Sdk } from "../sdk/createSdk";
import { useSdkContext } from "../sdk/SdkProvider";

const useStyles = makeStyles({
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(15rem, 20rem) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
    "@media (max-width: 63.99em)": { gridTemplateColumns: "minmax(0, 1fr)" },
  },
  picker: { padding: tokens.spacingHorizontalM, minWidth: 0 },
  column: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL, minWidth: 0 },
  card: { padding: tokens.spacingHorizontalL, gap: tokens.spacingVerticalM, minWidth: 0 },
  heading: { margin: 0 },
  bar: {
    display: "grid",
    gridTemplateColumns: "7rem minmax(0, 1fr) auto",
    gap: tokens.spacingHorizontalS,
    alignItems: "end",
    "@media (max-width: 47.99em)": { gridTemplateColumns: "minmax(0, 1fr)" },
  },
  url: { fontFamily: tokens.fontFamilyMonospace },
  opHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  opName: { fontFamily: tokens.fontFamilyMonospace, overflowWrap: "anywhere" },
  muted: { color: tokens.colorNeutralForeground3 },
  mono: { fontFamily: tokens.fontFamilyMonospace, overflowWrap: "anywhere" },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  tabPanel: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, minWidth: 0 },
  status: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  textarea: { fontFamily: tokens.fontFamilyMonospace, minHeight: "8rem" },
});

const DEFAULT_RAW: RawRequestInput = {
  method: "GET",
  url: "accounts?$select=name,accountid&$top=3",
  headers: "",
  body: "",
};

const EMPTY_INPUT: OperationInput = { args: {}, parameters: {} };

type Target =
  { type: "raw"; title: string } | { type: "operation"; op: CatalogOperation; title: string };

type ResponseTab = "response" | "headers" | "code" | "requests";

const FLAVOURS: Array<{ value: CodeFlavour; label: string }> = [
  { value: "typed", label: "client.execute()" },
  { value: "service", label: "OrganizationService" },
  { value: "fluent", label: "client.api()" },
];

/** What the request bar or the parameter form currently describes: its code, and how to run it. */
type Built =
  | {
      ok: true;
      code: string;
      send: (client: DataverseClient, signal?: AbortSignal) => Promise<unknown>;
      /** The same request as a raw one, to edit in the request bar. */
      raw?: RawRequestInput;
    }
  | { ok: false; code?: string; reason: string; problems?: ValueError[]; loading?: boolean };

const message = (error: unknown) => (error instanceof Error ? error.message : String(error));

let nextHistoryId = Date.now();

export default function ExplorerPage() {
  const styles = useStyles();
  const { connection, session } = useSdkContext();
  const environmentUrl = connection.environmentUrl;
  const apiRoot = `${environmentUrl}/api/data/v9.2`;
  const host = new URL(environmentUrl).host;
  const [searchParams, setSearchParams] = useSearchParams();

  const [pickerTab, setPickerTab] = useState<PickerTab>("samples");
  const [target, setTarget] = useState<Target>({ type: "raw", title: "Request" });
  const [raw, setRaw] = useState<RawRequestInput>(DEFAULT_RAW);
  const [opInput, setOpInput] = useState<OperationInput>(EMPTY_INPUT);
  const [flavour, setFlavour] = useState<CodeFlavour>("typed");
  const [requestTab, setRequestTab] = useState("body");
  const [responseTab, setResponseTab] = useState<ResponseTab>("code");
  const [history, setHistory] = useState<HistoryEntry[]>(readHistory);
  const [pkg, setPkg] = useState<
    { kind: OperationKind; pkg: OperationPackage } | { kind: OperationKind; error: unknown }
  >();
  const [selecting, setSelecting] = useState<{ error?: unknown } | undefined>();
  const [preview, setPreview] = useState<PreviewResult | undefined>();

  // The operation's package is loaded when an operation of it is first chosen.
  const opKind = target.type === "operation" ? target.op.kind : undefined;
  useEffect(() => {
    if (!opKind) return;
    let cancelled = false;
    loadPackage(opKind).then(
      (loaded) => !cancelled && setPkg({ kind: opKind, pkg: loaded }),
      (error: unknown) => !cancelled && setPkg({ kind: opKind, error })
    );
    return () => {
      cancelled = true;
    };
  }, [opKind]);

  const built = useMemo<Built>(() => {
    if (target.type === "raw") {
      try {
        const plan = parseRawRequest(raw, environmentUrl);
        return {
          ok: true,
          code: rawCode(plan),
          send: (client, signal) => runRawPlan(client, plan, signal),
        };
      } catch (error) {
        return { ok: false, reason: message(error) };
      }
    }
    const { op } = target;
    const draft = draftValues(op, opInput);
    const missing = draft.problems.length
      ? `// To run it, fill in: ${draft.problems.map((p) => p.field).join(", ")}\n`
      : "";
    // The typed and OrganizationService code need only the catalog; client.api() and running
    // need the package.
    const early = flavour === "fluent" ? undefined : missing + operationCode(op, draft, flavour);
    if (!pkg || pkg.kind !== op.kind)
      return { ok: false, code: early, reason: "Loading the package…", loading: true };
    if ("error" in pkg)
      return { ok: false, code: early, reason: `The package didn't load: ${message(pkg.error)}` };
    try {
      const operation = instantiate(pkg.pkg, op, draft);
      let rawEquivalent: RawRequestInput | undefined;
      let fluentCode: string | undefined;
      try {
        rawEquivalent = rawInputFromRequestInformation(
          operation.toRequestInformation(apiRoot),
          apiRoot
        );
        fluentCode = operationCode(op, draft, "fluent", fluentPlan(operation, apiRoot));
      } catch (error) {
        if (!draft.problems.length) throw error;
      }
      const code =
        flavour !== "fluent"
          ? (early ?? "")
          : fluentCode
            ? missing + fluentCode
            : "// The client.api() code appears when the parameters are filled in.";
      if (draft.problems.length) {
        return {
          ok: false,
          code,
          reason: draft.problems.map((p) => p.message).join(" "),
          problems: draft.problems,
        };
      }
      return {
        ok: true,
        code,
        raw: rawEquivalent,
        send: (client, signal) => runOperation(client, operation, flavour, signal),
      };
    } catch (error) {
      return { ok: false, reason: message(error) };
    }
  }, [target, raw, opInput, flavour, pkg, environmentUrl, apiRoot]);

  // The request preview: the SDK builds the request against a fetch that sends nothing.
  useEffect(() => {
    if (!built.ok) {
      setPreview(undefined);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      void previewRequests(environmentUrl, (client) => built.send(client)).then(
        (result) => !cancelled && setPreview(result)
      );
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [built, environmentUrl]);

  const task = useCallback(
    (sdk: Sdk, signal: AbortSignal) =>
      built.ok ? built.send(sdk.client, signal) : Promise.reject(new Error(built.reason)),
    [built]
  );
  const run = useRun(task);
  const running = run.state.status === "running";

  // What the history records for the run in progress.
  const pending = useRef<HistoryRequest | undefined>(undefined);
  useEffect(() => {
    if (run.state.status !== "done" && run.state.status !== "failed") return;
    const entry = pending.current;
    if (!entry) return;
    pending.current = undefined;
    const last = run.exchanges.at(-1);
    setHistory((h) =>
      addToHistory(h, {
        ...entry,
        id: String(nextHistoryId++),
        at: new Date().toISOString(),
        status: last?.status,
        ok: run.state.status === "done",
      })
    );
  }, [run.state]);

  const start = (event?: FormEvent) => {
    event?.preventDefault();
    if (!built.ok || running) return;
    pending.current =
      target.type === "raw"
        ? {
            type: "raw",
            title: target.title,
            method: raw.method,
            request: raw,
            environmentHost: host,
          }
        : {
            type: "operation",
            title: target.title,
            method: target.op.method,
            operation: { kind: target.op.kind, name: target.op.name },
            input: opInput,
            flavour,
            environmentHost: host,
          };
    setResponseTab("response");
    void run.start();
  };

  const selectRaw = (request: RawRequestInput, title: string) => {
    setTarget({ type: "raw", title });
    setRaw(request);
    setRequestTab(request.body.trim() ? "body" : request.headers.trim() ? "headers" : "body");
    setResponseTab("code");
    setSelecting(undefined);
    run.reset();
  };

  const selectOperation = (
    op: CatalogOperation,
    input: OperationInput = EMPTY_INPUT,
    chosenFlavour?: CodeFlavour,
    title = op.className
  ) => {
    setTarget({ type: "operation", op, title });
    setOpInput(input);
    setFlavour(chosenFlavour ?? (op.kind === "messages" ? "service" : "typed"));
    setRequestTab("parameters");
    setResponseTab("code");
    setSelecting(undefined);
    run.reset();
  };

  /** Choose operation `name` of `kind`, once its catalog is loaded. */
  const selectByName = async (
    kind: OperationKind,
    name: string,
    input?: OperationInput,
    chosenFlavour?: CodeFlavour,
    title?: string
  ) => {
    setSelecting({});
    try {
      const op = (await loadCatalog(kind)).find((o) => o.name === name);
      if (!op) throw new Error(`${PACKAGE_OF[kind]} has no operation ${name}.`);
      selectOperation(op, input, chosenFlavour, title);
    } catch (error) {
      setSelecting({ error });
    }
  };

  const selectSample = (sample: Sample) => {
    setSearchParams({ sample: sample.id }, { replace: true });
    if (sample.type === "raw") selectRaw(sample.request, sample.title);
    else
      void selectByName(
        sample.operation.kind,
        sample.operation.name,
        sample.input,
        sample.flavour,
        sample.title
      );
  };

  const selectHistory = (entry: HistoryEntry) => {
    if (entry.type === "raw") selectRaw(entry.request, entry.title);
    else
      void selectByName(
        entry.operation.kind,
        entry.operation.name,
        entry.input,
        entry.flavour,
        entry.title
      );
  };

  // Links into the explorer: ?sample=<id>, ?op=<kind>/<name>, or ?method=GET&url=<path>.
  useEffect(() => {
    const sample = SAMPLES.find((s) => s.id === searchParams.get("sample"));
    if (sample) {
      selectSample(sample);
      return;
    }
    const [kind, name] = (searchParams.get("op") ?? "").split("/");
    if (name && OPERATION_KINDS.includes(kind as OperationKind)) {
      void selectByName(kind as OperationKind, name);
      return;
    }
    const url = searchParams.get("url");
    if (url) {
      const method = (searchParams.get("method") ?? "GET").toUpperCase() as HttpMethod;
      selectRaw(
        {
          method: HTTP_METHODS.includes(method) ? method : "GET",
          url,
          headers: searchParams.get("headers") ?? "",
          body: searchParams.get("body") ?? "",
        },
        "Request"
      );
    }
    // Only when the page opens.
  }, []);

  const editRaw = (patch: Partial<RawRequestInput>) => {
    setRaw((r) => ({ ...r, ...patch }));
    if (target.type === "raw" && target.title !== "Request")
      setTarget({ type: "raw", title: "Request" });
  };

  const lastExchange = run.exchanges.at(-1);
  const summary =
    run.state.status === "done"
      ? `Finished in ${run.state.durationMs} ms with ${run.exchanges.length} request${run.exchanges.length === 1 ? "" : "s"}.`
      : run.state.status === "failed"
        ? `Failed after ${run.state.durationMs} ms with ${run.exchanges.length} request${run.exchanges.length === 1 ? "" : "s"}.`
        : run.state.status === "running"
          ? "Running…"
          : "Not run yet.";

  const runButton = (
    <Button
      type="submit"
      appearance="primary"
      icon={running ? <Spinner size="tiny" /> : <PlayRegular />}
      disabled={running || !built.ok}
    >
      {running ? "Running…" : "Run"}
    </Button>
  );

  // Wrong values are shown at their field; empty required ones only in the code's first line.
  const fieldErrors = Object.fromEntries(
    (built.ok ? [] : (built.problems ?? []))
      .filter((p) => !p.missing)
      .map((p) => [p.field, p.reason])
  );

  return (
    <ScenarioPage
      title="Explorer"
      description={
        <>
          Build a Web API request or pick a typed action, function or message, see the SDK code for
          it, run it and inspect the request and response. Requests go to{" "}
          <span className={styles.mono}>{host}</span>
          {session.mode === "demo"
            ? ", the in-browser demo environment: nothing leaves your browser."
            : ", your environment, as you: write requests change real data."}
        </>
      }
    >
      <div className={styles.layout}>
        <Card className={styles.picker} role="region" aria-label="Requests to try">
          <OperationPicker
            tab={pickerTab}
            onTabChange={setPickerTab}
            onSample={selectSample}
            onOperation={(op) => {
              setSearchParams({ op: `${op.kind}/${op.name}` }, { replace: true });
              selectOperation(op);
            }}
            history={history}
            onHistory={selectHistory}
            onClearHistory={() => setHistory(clearHistory())}
          />
        </Card>

        <div className={styles.column}>
          <Card className={styles.card} role="region" aria-labelledby="request-heading">
            <Subtitle1 as="h2" id="request-heading" className={styles.heading}>
              Request
            </Subtitle1>
            {selecting && !selecting.error && (
              <Spinner size="small" label="Loading the operation…" />
            )}
            {selecting?.error !== undefined && <ErrorCard error={selecting.error} />}
            <form onSubmit={start} aria-label="Request" className={styles.tabPanel}>
              {target.type === "raw" ? (
                <>
                  <div className={styles.bar}>
                    <Field label="Method">
                      <Select
                        value={raw.method}
                        onChange={(_, d) => editRaw({ method: d.value as HttpMethod })}
                      >
                        {HTTP_METHODS.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="URL">
                      <Input
                        className={styles.url}
                        value={raw.url}
                        onChange={(_, d) => editRaw({ url: d.value })}
                        spellCheck={false}
                      />
                    </Field>
                    <div>{runButton}</div>
                  </div>
                  <Caption1 className={styles.muted}>
                    Relative to <span className={styles.mono}>{apiRoot}/</span>
                  </Caption1>
                  <TabList
                    selectedValue={requestTab}
                    onTabSelect={(_, d) => setRequestTab(String(d.value))}
                    aria-label="Request details"
                    size="small"
                  >
                    <Tab value="body">Body</Tab>
                    <Tab value="headers">Headers</Tab>
                    <Tab value="preview">Preview</Tab>
                  </TabList>
                  {requestTab === "body" && (
                    <Field
                      label="Body (JSON)"
                      hint={
                        raw.method === "GET" || raw.method === "DELETE"
                          ? `${raw.method} requests send no body.`
                          : undefined
                      }
                    >
                      <Textarea
                        className={styles.textarea}
                        value={raw.body}
                        onChange={(_, d) => editRaw({ body: d.value })}
                        placeholder='{ "name": "Contoso" }'
                        resize="vertical"
                        spellCheck={false}
                      />
                    </Field>
                  )}
                  {requestTab === "headers" && (
                    <Field
                      label="Headers"
                      hint="One Name: value per line. Prefer, If-Match, If-None-Match, MSCRMCallerID and CallerObjectId become the SDK's own methods."
                    >
                      <Textarea
                        className={styles.textarea}
                        value={raw.headers}
                        onChange={(_, d) => editRaw({ headers: d.value })}
                        placeholder="Prefer: return=representation"
                        resize="vertical"
                        spellCheck={false}
                      />
                    </Field>
                  )}
                </>
              ) : (
                <>
                  <div className={styles.opHeader}>
                    <MethodBadge method={target.op.method} />
                    <Text weight="semibold" className={styles.opName}>
                      {target.op.className}
                    </Text>
                    <Caption1 className={styles.muted}>{PACKAGE_OF[target.op.kind]}</Caption1>
                  </div>
                  <Caption1 className={styles.mono}>
                    {target.op.method} {target.op.route}
                  </Caption1>
                  <TabList
                    selectedValue={requestTab}
                    onTabSelect={(_, d) => setRequestTab(String(d.value))}
                    aria-label="Request details"
                    size="small"
                  >
                    <Tab value="parameters">Parameters</Tab>
                    <Tab value="preview">Preview</Tab>
                  </TabList>
                  {requestTab === "parameters" && (
                    <ParameterForm
                      op={target.op}
                      input={opInput}
                      onChange={setOpInput}
                      errors={fieldErrors}
                    />
                  )}
                  <div className={styles.actions}>
                    {runButton}
                    <Button
                      icon={<ArrowSwapRegular />}
                      disabled={!built.ok || !built.raw}
                      onClick={() => built.ok && built.raw && selectRaw(built.raw, "Request")}
                    >
                      Edit as a raw request
                    </Button>
                  </div>
                </>
              )}
              {requestTab === "preview" && (
                <section className={styles.tabPanel} aria-label="Request preview">
                  <Caption1 className={styles.muted}>
                    The request the SDK will send, built by the SDK without sending it.
                  </Caption1>
                  {!built.ok ? (
                    <Caption1 className={styles.muted}>{built.reason}</Caption1>
                  ) : !preview ? (
                    <Spinner size="tiny" label="Building the request…" />
                  ) : preview.error !== undefined ? (
                    <ErrorCard error={preview.error} />
                  ) : (
                    preview.requests.map((r, i) => (
                      <CodeBlock key={i} code={httpText(r)} plain label="Previewed request" />
                    ))
                  )}
                </section>
              )}
              {!built.ok && !built.loading && !built.problems && (
                <MessageBar intent="warning">
                  <MessageBarBody>{built.reason}</MessageBarBody>
                </MessageBar>
              )}
            </form>
          </Card>

          <Card className={styles.card} role="region" aria-labelledby="response-heading">
            <Subtitle1 as="h2" id="response-heading" className={styles.heading}>
              Response
            </Subtitle1>
            <div className={styles.status}>
              {lastExchange && (
                <StatusBadge status={lastExchange.status} error={lastExchange.error} />
              )}
              <Body1 role="status" aria-live="polite">
                {summary}
              </Body1>
              {running && (
                <Button size="small" icon={<DismissRegular />} onClick={run.cancel}>
                  Cancel
                </Button>
              )}
            </div>
            <TabList
              selectedValue={responseTab}
              onTabSelect={(_, d) => setResponseTab(d.value as ResponseTab)}
              aria-label="Response details"
              size="small"
            >
              <Tab value="response">Response</Tab>
              <Tab value="headers">Headers</Tab>
              <Tab value="code">SDK code</Tab>
              <Tab value="requests">Requests</Tab>
            </TabList>
            {responseTab === "response" && (
              <section className={styles.tabPanel} aria-label="Response preview">
                {run.state.status === "idle" && (
                  <Caption1 className={styles.muted}>Run the request to see its result.</Caption1>
                )}
                {run.state.status === "running" && <Spinner size="small" label="Waiting…" />}
                {run.state.status === "done" &&
                  (run.state.result === undefined ? (
                    <Caption1>No content: the request succeeded with an empty body.</Caption1>
                  ) : (
                    <JsonView value={run.state.result} label="Response body" />
                  ))}
                {run.state.status === "failed" && <ErrorCard error={run.state.error} />}
              </section>
            )}
            {responseTab === "headers" && (
              <section className={styles.tabPanel} aria-label="Response headers">
                {lastExchange?.responseHeaders ? (
                  <HeaderList headers={lastExchange.responseHeaders} />
                ) : (
                  <Caption1 className={styles.muted}>No response yet.</Caption1>
                )}
              </section>
            )}
            {responseTab === "code" && (
              <section className={styles.tabPanel} aria-label="SDK code">
                {target.type === "operation" && (
                  <RadioGroup
                    layout="horizontal"
                    value={flavour}
                    onChange={(_, d) => setFlavour(d.value as CodeFlavour)}
                    aria-label="Code style"
                  >
                    {FLAVOURS.map((f) => (
                      <Radio key={f.value} value={f.value} label={f.label} />
                    ))}
                  </RadioGroup>
                )}
                {built.code !== undefined ? (
                  <CodeBlock code={built.code} label="SDK code" />
                ) : built.ok ? null : built.loading ? (
                  <Spinner size="tiny" label="Loading the package…" />
                ) : (
                  <Caption1 className={styles.muted}>{built.reason}</Caption1>
                )}
              </section>
            )}
            {responseTab === "requests" && <RequestInspector exchanges={run.exchanges} />}
          </Card>
        </div>
      </div>
    </ScenarioPage>
  );
}
