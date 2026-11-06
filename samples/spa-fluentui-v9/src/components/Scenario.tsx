import { useEffect, useId, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Badge,
  Body1,
  Button,
  Card,
  CardHeader,
  Caption1,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  MessageBar,
  MessageBarBody,
  Skeleton,
  SkeletonItem,
  Spinner,
  Subtitle1,
  Text,
  Toast,
  ToastTitle,
  tokens,
  useToastController,
} from "@fluentui/react-components";
import { DismissRegular, PlayRegular } from "@fluentui/react-icons";
import { useRun } from "../hooks/useRun";
import type { Sdk } from "../sdk/createSdk";
import { CodeBlock } from "./CodeBlock";
import { ErrorCard } from "./ErrorCard";
import { JsonView } from "./JsonView";
import { RequestInspector } from "./RequestInspector";
import { TOASTER_ID } from "./toaster";

const useStyles = makeStyles({
  card: { padding: tokens.spacingHorizontalL, gap: tokens.spacingVerticalL },
  form: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  fields: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
    gap: tokens.spacingHorizontalM,
    alignItems: "start",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, minWidth: 0 },
  sectionTitle: { margin: 0 },
  summary: { color: tokens.colorNeutralForeground3 },
  skeleton: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  visuallyHidden: {
    position: "absolute",
    width: tokens.strokeWidthThin,
    height: tokens.strokeWidthThin,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
});

export interface ConfirmOptions {
  title: string;
  body: ReactNode;
  confirmLabel: string;
}

export interface ScenarioProps<T> {
  title: string;
  description: ReactNode;
  /** The code the Run button runs, from `snippet(source, region)`. */
  code: string;
  run: (sdk: Sdk, signal: AbortSignal) => Promise<T>;
  /** The scenario's inputs (Fluent `Field`s). */
  children?: ReactNode;
  runLabel?: string;
  /** Why the scenario can't run yet, e.g. "Create a record first". */
  disabledReason?: string;
  /** Ask before running: for scenarios that delete or overwrite data. */
  confirm?: ConfirmOptions;
  renderResult?: (result: T) => ReactNode;
  /** A toast after a successful run, for changes the result doesn't show. */
  successMessage?: (result: T) => string;
  onResult?: (result: T) => void;
  /** The scenario shows an error on purpose (labelled as such). */
  failsOnPurpose?: boolean;
}

/**
 * The pattern every scenario follows: what it shows, its inputs and Run button, the code it runs,
 * the result (or a typed error card), and the requests it sent.
 */
export function Scenario<T>(props: ScenarioProps<T>) {
  const {
    title,
    description,
    code,
    run,
    children,
    runLabel = "Run",
    disabledReason,
    confirm,
    renderResult,
    successMessage,
    onResult,
    failsOnPurpose,
  } = props;
  const styles = useStyles();
  const headingId = useId();
  const { state, exchanges, start, cancel } = useRun(run);
  const [confirming, setConfirming] = useState(false);
  const { dispatchToast } = useToastController(TOASTER_ID);
  const running = state.status === "running";

  useEffect(() => {
    if (state.status !== "done") return;
    onResult?.(state.result);
    const message = successMessage?.(state.result);
    if (message) {
      dispatchToast(
        <Toast>
          <ToastTitle>{message}</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    }
    // Only when a run finishes, not when the callbacks change identity.
  }, [state]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (running || disabledReason) return;
    if (confirm) setConfirming(true);
    else void start();
  };

  const summary =
    state.status === "done"
      ? `Finished in ${state.durationMs} ms with ${exchanges.length} request${exchanges.length === 1 ? "" : "s"}.`
      : state.status === "failed"
        ? `Failed after ${state.durationMs} ms with ${exchanges.length} request${exchanges.length === 1 ? "" : "s"}.`
        : state.status === "running"
          ? "Running…"
          : "";

  return (
    <Card
      className={styles.card}
      aria-labelledby={headingId}
      role="region"
      data-scenario={title}
      data-expect={failsOnPurpose ? "error" : "success"}
    >
      <CardHeader
        header={
          <Subtitle1 as="h2" id={headingId}>
            {title}
          </Subtitle1>
        }
        description={<Body1>{description}</Body1>}
        action={
          failsOnPurpose ? (
            <Badge appearance="tint" color="warning" shape="rounded">
              Fails on purpose
            </Badge>
          ) : undefined
        }
      />

      <form className={styles.form} onSubmit={submit} aria-label={`${title} inputs`}>
        {children && <div className={styles.fields}>{children}</div>}
        <div className={styles.actions}>
          <Button
            type="submit"
            appearance="primary"
            icon={running ? <Spinner size="tiny" /> : <PlayRegular />}
            disabled={running || !!disabledReason}
          >
            {running ? "Running…" : runLabel}
          </Button>
          {running && (
            <Button icon={<DismissRegular />} onClick={cancel}>
              Cancel
            </Button>
          )}
          {disabledReason && <Caption1 className={styles.summary}>{disabledReason}</Caption1>}
        </div>
      </form>

      <section className={styles.section} aria-label="Code">
        <Text as="h3" weight="semibold" className={styles.sectionTitle}>
          Code
        </Text>
        <CodeBlock code={code} label={`${title} code`} />
      </section>

      <section className={styles.section} aria-label="Result">
        <Text as="h3" weight="semibold" className={styles.sectionTitle}>
          Result
        </Text>
        <span className={styles.visuallyHidden} role="status" aria-live="polite">
          {summary}
        </span>
        {state.status === "idle" && <Caption1 className={styles.summary}>Not run yet.</Caption1>}
        {state.status === "running" && (
          <Skeleton className={styles.skeleton} aria-label="Waiting for the result">
            <SkeletonItem size={16} />
            <SkeletonItem size={16} />
            <SkeletonItem size={16} />
          </Skeleton>
        )}
        {state.status === "done" && (
          <>
            <MessageBar intent="success">
              <MessageBarBody>{summary}</MessageBarBody>
            </MessageBar>
            {renderResult ? renderResult(state.result) : <JsonView value={state.result} />}
          </>
        )}
        {state.status === "failed" && (
          <>
            <Caption1 className={styles.summary}>{summary}</Caption1>
            <ErrorCard error={state.error} />
          </>
        )}
      </section>

      <section className={styles.section} aria-label="Requests">
        <Text as="h3" weight="semibold" className={styles.sectionTitle}>
          Requests
        </Text>
        <RequestInspector exchanges={exchanges} />
      </section>

      {confirm && (
        <Dialog
          open={confirming}
          onOpenChange={(_, data) => setConfirming(data.open)}
          modalType="alert"
        >
          <DialogSurface>
            <DialogBody>
              <DialogTitle>{confirm.title}</DialogTitle>
              <DialogContent>{confirm.body}</DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  onClick={() => {
                    setConfirming(false);
                    void start();
                  }}
                >
                  {confirm.confirmLabel}
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </Card>
  );
}
