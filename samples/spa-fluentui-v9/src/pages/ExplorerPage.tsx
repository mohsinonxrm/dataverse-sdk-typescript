import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Body1,
  Body1Strong,
  Button,
  Caption1,
  Card,
  Field,
  Input,
  makeStyles,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Subtitle1,
  Tab,
  TabList,
  Textarea,
  Toast,
  ToastBody,
  ToastTitle,
  tokens,
  useToastController,
} from "@fluentui/react-components";
import {
  ArrowSwapRegular,
  DismissRegular,
  PlayRegular,
  TableSearchRegular,
} from "@fluentui/react-icons";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { ErrorCard } from "../components/ErrorCard";
import { JsonEditor } from "../components/JsonEditor";
import { JsonView } from "../components/JsonView";
import { HeaderList, RequestInspector } from "../components/RequestInspector";
import { ScenarioPage } from "../components/ScenarioPage";
import { MethodBadge, StatusBadge } from "../components/StatusBadge";
import { useTabs } from "../components/tabs";
import { TOASTER_ID } from "../components/toaster";
import {
  API_VERSIONS,
  apiRootOf,
  DEFAULT_API_VERSION,
  isApiVersion,
  readApiVersion,
  writeApiVersion,
  type ExplorerApiVersion,
} from "../explorer/apiVersion";
import { loadCatalog, loadPackage } from "../explorer/catalog/load";
import { operationCode, rawCode } from "../explorer/codegen";
import { CopyAsMenu } from "../explorer/components/CopyAsMenu";
import { EnvironmentSwitcher } from "../explorer/components/EnvironmentSwitcher";
import {
  OperationPicker,
  pickedHistory,
  pickedOperation,
  pickedSample,
  type PickerTab,
} from "../explorer/components/OperationPicker";
import { ParameterForm } from "../explorer/components/ParameterForm";
import { ShareRequest } from "../explorer/components/ShareRequest";
import { TableBrowser } from "../explorer/components/TableBrowser";
import { TokenPanel } from "../explorer/components/TokenPanel";
import { ORG_PLACEHOLDER, withOrigin, type CopyAsRequest } from "../explorer/copyAs";
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
import type { TableSummary } from "../explorer/tables";
import {
  decodeShare,
  sharedRequestRisks,
  sharePayload,
  withoutSecretHeaders,
  type SharedRequest,
} from "../explorer/share";
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
import { createClient, type Sdk } from "../sdk/createSdk";
import { useSdkContext } from "../sdk/SdkProvider";
import { MEDIA_MEDIUM, MEDIA_SMALL, MEDIUM } from "../theme/layout";
import { useCommonStyles } from "../theme/styles";

const useStyles = makeStyles({
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(15rem, 20rem) minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalL,
    columnGap: tokens.spacingHorizontalL,
    alignItems: "start",
    [MEDIA_MEDIUM]: { gridTemplateColumns: "minmax(0, 1fr)" },
  },
  column: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL, minWidth: 0 },
  card: { minWidth: 0 },
  bar: {
    display: "grid",
    gridTemplateColumns: "7rem minmax(0, 1fr) auto",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
    alignItems: "end",
    [MEDIA_SMALL]: { gridTemplateColumns: "minmax(0, 1fr)" },
  },
  url: { fontFamily: tokens.fontFamilyMonospace },
  opHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
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
  cardHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  codeBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
  },
  codeBarEnd: { marginInlineStart: "auto" },
  // Environment, Web API version and the table browser, above the request.
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "end",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalL,
  },
  // Five tabs: on a phone they wrap rather than widen the page.
  wrapTabs: { flexWrap: "wrap" },
});

/** A request opened from a shared link, or why the link couldn't be opened. */
type ShareNotice = { type: "loaded"; shared: SharedRequest } | { type: "error"; reason: string };

const SHARED_TITLE = "Shared request";

const DEFAULT_RAW: RawRequestInput = {
  method: "GET",
  url: "accounts?$select=name,accountid&$top=3",
  headers: "",
  body: "",
};

const EMPTY_INPUT: OperationInput = { args: {}, parameters: {} };

type Target =
  { type: "raw"; title: string } | { type: "operation"; op: CatalogOperation; title: string };

type ResponseTab = "response" | "headers" | "code" | "requests" | "token";

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
  const common = useCommonStyles();
  const { connection, session } = useSdkContext();
  const environmentUrl = connection.environmentUrl;
  // The Web API version picked for this environment (kept per environment in this browser).
  const [chosenVersion, setChosenVersion] = useState(() => ({
    environmentUrl,
    version: readApiVersion(environmentUrl),
  }));
  const apiVersion =
    chosenVersion.environmentUrl === environmentUrl
      ? chosenVersion.version
      : readApiVersion(environmentUrl);
  const changeApiVersion = (version: ExplorerApiVersion) => {
    writeApiVersion(environmentUrl, version);
    setChosenVersion({ environmentUrl, version });
  };
  const apiRoot = apiRootOf(environmentUrl, apiVersion);
  const host = new URL(environmentUrl).host;
  const [tablesOpen, setTablesOpen] = useState(false);
  const { dispatchToast } = useToastController(TOASTER_ID);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [shareNotice, setShareNotice] = useState<ShareNotice>();

  const [pickerTab, setPickerTab] = useState<PickerTab>("samples");
  // The picker's item the request came from, shown as selected there.
  const [picked, setPicked] = useState<string>();
  const [target, setTarget] = useState<Target>({ type: "raw", title: "Request" });
  const [raw, setRaw] = useState<RawRequestInput>(DEFAULT_RAW);
  const [opInput, setOpInput] = useState<OperationInput>(EMPTY_INPUT);
  const [flavour, setFlavour] = useState<CodeFlavour>("typed");
  const [requestTab, setRequestTab] = useState("body");
  const [responseTab, setResponseTab] = useState<ResponseTab>("code");
  const requestTabs = useTabs(requestTab, setRequestTab, "Request details");
  const responseTabs = useTabs(responseTab, setResponseTab, "Response details");
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
          code: rawCode(plan, apiVersion),
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
    const early =
      flavour === "fluent"
        ? undefined
        : missing + operationCode(op, draft, flavour, undefined, apiVersion);
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
        fluentCode = operationCode(op, draft, "fluent", fluentPlan(operation, apiRoot), apiVersion);
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
  }, [target, raw, opInput, flavour, pkg, environmentUrl, apiRoot, apiVersion]);

  // The request preview: the SDK builds the request against a fetch that sends nothing.
  useEffect(() => {
    if (!built.ok) {
      setPreview(undefined);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      void previewRequests(environmentUrl, (client) => built.send(client), apiVersion).then(
        (result) => !cancelled && setPreview(result)
      );
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [built, environmentUrl, apiVersion]);

  // Runs with a client on the picked Web API version.
  const task = useCallback(
    (sdk: Sdk, signal: AbortSignal) =>
      built.ok
        ? built.send(sdk.createClient({ apiVersion }), signal)
        : Promise.reject(new Error(built.reason)),
    [built, apiVersion]
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
    setShareNotice(undefined);
    setPicked(pickedSample(sample.id));
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
    setShareNotice(undefined);
    setPicked(pickedHistory(entry.id));
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

  // The table browser's "Query this table": the request is filled in, not run.
  const queryTable = (request: RawRequestInput, table: TableSummary) => {
    setShareNotice(undefined);
    setPicked(undefined);
    setSearchParams({ url: request.url }, { replace: true });
    selectRaw(request, `Query ${table.entitySetName}`);
    setTablesOpen(false);
    requestAnimationFrame(() =>
      document.getElementById("request-heading")?.scrollIntoView({ block: "start" })
    );
  };

  // Another environment: the request stays as it is, and nothing runs until asked; the response
  // of the last run (from the other environment) is cleared.
  const environmentSwitched = (url: string) => {
    run.reset();
    dispatchToast(
      <Toast>
        <ToastTitle>Switched to {new URL(url).host}</ToastTitle>
        <ToastBody>The request is kept. Run it when you&apos;re ready.</ToastBody>
      </Toast>,
      { intent: "info", timeout: 4000 }
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
      setPicked(pickedOperation({ kind: kind as OperationKind, name }));
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
          headers: withoutSecretHeaders(searchParams.get("headers") ?? ""),
          body: searchParams.get("body") ?? "",
        },
        "Request"
      );
    }
    // Only when the page opens.
  }, []);

  // A shared link, /explorer#r=…: the request is loaded, never run, and the fragment removed so
  // a reload doesn't load it over the visitor's edits. The link is untrusted: decodeShare()
  // validates it and throws a ShareError that says what is wrong.
  useEffect(() => {
    const payload = sharePayload(location.hash);
    if (payload === undefined) return;
    let cancelled = false;
    const done = () =>
      void navigate({ pathname: location.pathname, search: location.search }, { replace: true });
    decodeShare(payload).then(
      (shared) => {
        if (cancelled) return;
        setPicked(undefined);
        if (shared.type === "raw") selectRaw(shared.request, SHARED_TITLE);
        else
          void selectByName(
            shared.operation.kind,
            shared.operation.name,
            shared.input,
            shared.flavour,
            SHARED_TITLE
          );
        setShareNotice({ type: "loaded", shared });
        done();
        // In one column, the request (and the notice) is below the picker: show it.
        if (window.matchMedia(MEDIUM).matches)
          requestAnimationFrame(() =>
            document.getElementById("request-heading")?.scrollIntoView({ block: "start" })
          );
      },
      (error: unknown) => {
        if (cancelled) return;
        setShareNotice({ type: "error", reason: message(error) });
        done();
      }
    );
    return () => {
      cancelled = true;
    };
    // When a link's fragment arrives (on opening, or pasted into the address bar).
  }, [location.hash]);

  const sharedRequest = useMemo<SharedRequest>(
    () =>
      target.type === "raw"
        ? { type: "raw", request: raw }
        : {
            type: "operation",
            operation: { kind: target.op.kind, name: target.op.name },
            input: opInput,
            flavour,
          },
    [target, raw, opInput, flavour]
  );

  const copyAsRequests = useMemo<CopyAsRequest[] | undefined>(() => {
    if (!built.ok || !preview || preview.error !== undefined || !preview.requests.length)
      return undefined;
    return session.mode === "demo"
      ? preview.requests.map((r) => withOrigin(r, ORG_PLACEHOLDER))
      : preview.requests;
  }, [built.ok, preview, session.mode]);

  const method = target.type === "raw" ? raw.method : target.op.method;
  const risks =
    shareNotice?.type === "loaded" ? sharedRequestRisks(shareNotice.shared, method) : undefined;
  const sharedFrom = shareNotice?.type === "loaded" ? shareNotice.shared.environmentUrl : undefined;

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
          <span className={common.mono}>{host}</span>
          {session.mode === "demo"
            ? ", the in-browser demo environment: nothing leaves your browser."
            : ", your environment, as you: write requests change real data."}
        </>
      }
    >
      <div className={styles.toolbar}>
        <EnvironmentSwitcher onSwitch={environmentSwitched} />
        <Field label="Web API version">
          <Select
            value={apiVersion}
            onChange={(_, d) => isApiVersion(d.value) && changeApiVersion(d.value)}
          >
            {API_VERSIONS.map((v) => (
              <option key={v} value={v}>
                {v === DEFAULT_API_VERSION ? `${v} (default)` : v}
              </option>
            ))}
          </Select>
        </Field>
        <Button icon={<TableSearchRegular />} onClick={() => setTablesOpen(true)}>
          Browse tables
        </Button>
      </div>
      <TableBrowser
        open={tablesOpen}
        onOpenChange={setTablesOpen}
        createClient={() => createClient(connection, () => undefined, { apiVersion })}
        cacheKey={`${session.accountId}|${apiRoot}`}
        onQuery={queryTable}
      />
      <div className={styles.layout}>
        <Card className={styles.card} size="large" role="region" aria-labelledby="picker-heading">
          <Subtitle1 as="h2" id="picker-heading">
            Requests to try
          </Subtitle1>
          <OperationPicker
            tab={pickerTab}
            onTabChange={setPickerTab}
            onSample={selectSample}
            picked={picked}
            onOperation={(op) => {
              setShareNotice(undefined);
              setPicked(pickedOperation(op));
              setSearchParams({ op: `${op.kind}/${op.name}` }, { replace: true });
              selectOperation(op);
            }}
            history={history}
            onHistory={selectHistory}
            onClearHistory={() => setHistory(clearHistory())}
          />
        </Card>

        <div className={styles.column}>
          <Card
            className={styles.card}
            size="large"
            role="region"
            aria-labelledby="request-heading"
          >
            <div className={styles.cardHeader}>
              <Subtitle1 as="h2" id="request-heading">
                Request
              </Subtitle1>
              <ShareRequest request={sharedRequest} environmentUrl={environmentUrl} />
            </div>
            {shareNotice?.type === "error" && (
              <MessageBar intent="error">
                <MessageBarBody>
                  <MessageBarTitle>The shared link can&apos;t be opened</MessageBarTitle>
                  {shareNotice.reason}
                </MessageBarBody>
                <MessageBarActions
                  containerAction={
                    <Button
                      appearance="transparent"
                      aria-label="Dismiss"
                      icon={<DismissRegular />}
                      onClick={() => setShareNotice(undefined)}
                    />
                  }
                />
              </MessageBar>
            )}
            {shareNotice?.type === "loaded" && (
              <MessageBar intent="info">
                <MessageBarBody>
                  <MessageBarTitle>Loaded a shared request</MessageBarTitle>
                  Review it before running: it came from a link, and it hasn&apos;t run.
                  {sharedFrom && sharedFrom !== environmentUrl && (
                    <>
                      {" "}
                      It was shared from{" "}
                      <span className={common.mono}>{new URL(sharedFrom).host}</span>; here it runs
                      against <span className={common.mono}>{host}</span>.
                    </>
                  )}
                </MessageBarBody>
                <MessageBarActions
                  containerAction={
                    <Button
                      appearance="transparent"
                      aria-label="Dismiss"
                      icon={<DismissRegular />}
                      onClick={() => setShareNotice(undefined)}
                    />
                  }
                />
              </MessageBar>
            )}
            {risks && (risks.changesData || risks.impersonates) && (
              <MessageBar intent="warning">
                <MessageBarBody>
                  <MessageBarTitle>
                    {risks.changesData ? `This ${method} request changes data` : "Impersonation"}
                  </MessageBarTitle>
                  {risks.changesData &&
                    (session.mode === "demo"
                      ? "Running it changes the demo data. "
                      : "Running it changes data in your environment, as you. ")}
                  {risks.impersonates &&
                    "It acts on behalf of another user (MSCRMCallerID or CallerObjectId). "}
                  Check what it does first.
                </MessageBarBody>
              </MessageBar>
            )}
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
                  <Caption1 className={common.muted}>
                    Relative to <span className={common.mono}>{apiRoot}/</span>
                  </Caption1>
                  <TabList {...requestTabs.list}>
                    <Tab {...requestTabs.tab("body")}>Body</Tab>
                    <Tab {...requestTabs.tab("headers")}>Headers</Tab>
                    <Tab {...requestTabs.tab("preview")}>Preview</Tab>
                  </TabList>
                </>
              ) : (
                <>
                  <div className={styles.opHeader}>
                    <MethodBadge method={target.op.method} />
                    <Body1Strong className={common.mono}>{target.op.className}</Body1Strong>
                    <Caption1 className={common.muted}>{PACKAGE_OF[target.op.kind]}</Caption1>
                  </div>
                  <Caption1 className={common.mono}>
                    {target.op.method} {target.op.route}
                  </Caption1>
                  <TabList {...requestTabs.list}>
                    <Tab {...requestTabs.tab("parameters")}>Parameters</Tab>
                    <Tab {...requestTabs.tab("preview")}>Preview</Tab>
                  </TabList>
                </>
              )}
              <div {...requestTabs.panel} className={styles.tabPanel}>
                {target.type === "raw" && requestTab === "body" && (
                  <JsonEditor
                    label="Body (JSON)"
                    value={raw.body}
                    onChange={(body) => editRaw({ body })}
                    placeholder='{ "name": "Contoso" }'
                    hint={
                      raw.method === "GET" || raw.method === "DELETE"
                        ? `${raw.method} requests send no body.`
                        : undefined
                    }
                  />
                )}
                {target.type === "raw" && requestTab === "headers" && (
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
                {target.type === "operation" && requestTab === "parameters" && (
                  <ParameterForm
                    op={target.op}
                    input={opInput}
                    onChange={setOpInput}
                    errors={fieldErrors}
                  />
                )}
                {requestTab === "preview" && (
                  <>
                    <Caption1 className={common.muted}>
                      The request the SDK will send, built by the SDK without sending it.
                    </Caption1>
                    {!built.ok ? (
                      <Caption1 className={common.muted}>{built.reason}</Caption1>
                    ) : !preview ? (
                      <Spinner size="tiny" label="Building the request…" />
                    ) : preview.error !== undefined ? (
                      <ErrorCard error={preview.error} />
                    ) : (
                      preview.requests.map((r, i) => (
                        <CodeBlock
                          key={i}
                          code={httpText(r)}
                          language="http"
                          label={
                            preview.requests.length > 1
                              ? `Previewed request ${i + 1}`
                              : "Previewed request"
                          }
                        />
                      ))
                    )}
                  </>
                )}
              </div>
              {target.type === "operation" && (
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
              )}
              {!built.ok && !built.loading && !built.problems && (
                <MessageBar intent="warning">
                  <MessageBarBody>{built.reason}</MessageBarBody>
                </MessageBar>
              )}
            </form>
          </Card>

          <Card
            className={styles.card}
            size="large"
            role="region"
            aria-labelledby="response-heading"
          >
            <Subtitle1 as="h2" id="response-heading">
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
            <TabList {...responseTabs.list} className={styles.wrapTabs}>
              <Tab {...responseTabs.tab("response")}>Response</Tab>
              <Tab {...responseTabs.tab("headers")}>Headers</Tab>
              <Tab {...responseTabs.tab("code")}>SDK code</Tab>
              <Tab {...responseTabs.tab("requests")}>Requests</Tab>
              <Tab {...responseTabs.tab("token")}>Token</Tab>
            </TabList>
            <div {...responseTabs.panel} className={styles.tabPanel}>
              {responseTab === "response" && run.state.status === "idle" && (
                <Caption1 className={common.muted}>Run the request to see its result.</Caption1>
              )}
              {responseTab === "response" && run.state.status === "running" && (
                <Spinner size="small" label="Waiting…" />
              )}
              {responseTab === "response" &&
                run.state.status === "done" &&
                (run.state.result === undefined ? (
                  <Caption1>No content: the request succeeded with an empty body.</Caption1>
                ) : (
                  <JsonView value={run.state.result} label="Response body" />
                ))}
              {responseTab === "response" && run.state.status === "failed" && (
                <ErrorCard error={run.state.error} />
              )}
              {responseTab === "headers" &&
                (lastExchange?.responseHeaders ? (
                  <HeaderList headers={lastExchange.responseHeaders} />
                ) : (
                  <Caption1 className={common.muted}>No response yet.</Caption1>
                ))}
              {responseTab === "code" && (
                <>
                  <div className={styles.codeBar}>
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
                    <div className={styles.codeBarEnd}>
                      <CopyAsMenu requests={copyAsRequests} demo={session.mode === "demo"} />
                    </div>
                  </div>
                  {built.code !== undefined ? (
                    <CodeBlock code={built.code} label="SDK code" />
                  ) : built.ok ? null : built.loading ? (
                    <Spinner size="tiny" label="Loading the package…" />
                  ) : (
                    <Caption1 className={common.muted}>{built.reason}</Caption1>
                  )}
                </>
              )}
              {responseTab === "requests" && <RequestInspector exchanges={run.exchanges} />}
              {responseTab === "token" && <TokenPanel />}
            </div>
          </Card>
        </div>
      </div>
    </ScenarioPage>
  );
}
