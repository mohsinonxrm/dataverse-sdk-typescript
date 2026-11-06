import { useCallback, useEffect, useRef, useState } from "react";
import { createSdk, type Sdk } from "../sdk/createSdk";
import type { Exchange } from "../sdk/inspector";
import { useSdkContext } from "../sdk/SdkProvider";

export type RunState<T> =
  | { status: "idle" }
  | { status: "running" }
  | { status: "done"; result: T; durationMs: number }
  | { status: "failed"; error: unknown; durationMs: number };

export interface Run<T> {
  state: RunState<T>;
  /** The requests of the latest run, in the order they were sent. */
  exchanges: Exchange[];
  start: () => Promise<void>;
  cancel: () => void;
  reset: () => void;
}

/**
 * Run a scenario with its own `DataverseClient`, so its inspector shows exactly the requests
 * this run sent. Cancelling aborts the run's `AbortSignal`.
 */
export function useRun<T>(task: (sdk: Sdk, signal: AbortSignal) => Promise<T>): Run<T> {
  const { connection } = useSdkContext();
  const [state, setState] = useState<RunState<T>>({ status: "idle" });
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const controller = useRef<AbortController | null>(null);
  const runId = useRef(0);

  useEffect(() => () => controller.current?.abort(), []);

  const start = useCallback(async () => {
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    const id = ++runId.current;
    setExchanges([]);
    setState({ status: "running" });
    const sdk = createSdk(connection, (exchange) => {
      if (runId.current !== id) return;
      setExchanges((list) => {
        const index = list.findIndex((e) => e.id === exchange.id);
        if (index < 0) return [...list, exchange];
        const next = [...list];
        next[index] = { ...next[index], ...exchange };
        return next;
      });
    });
    const started = performance.now();
    try {
      const result = await task(sdk, abort.signal);
      if (runId.current === id) {
        setState({ status: "done", result, durationMs: Math.round(performance.now() - started) });
      }
    } catch (error) {
      if (runId.current === id) {
        setState({ status: "failed", error, durationMs: Math.round(performance.now() - started) });
      }
    } finally {
      if (controller.current === abort) controller.current = null;
    }
  }, [connection, task]);

  const cancel = useCallback(() => controller.current?.abort(), []);
  const reset = useCallback(() => {
    controller.current?.abort();
    runId.current++;
    setState({ status: "idle" });
    setExchanges([]);
  }, []);

  return { state, exchanges, start, cancel, reset };
}
