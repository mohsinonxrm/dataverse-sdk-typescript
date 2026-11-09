/**
 * The explorer's history: the requests this browser ran, newest first, kept in localStorage
 * (a convenience for this visitor only; it is never sent anywhere).
 */
import { readLocal, writeLocal } from "../lib/storage";
import type {
  CodeFlavour,
  HttpMethod,
  OperationInput,
  OperationKind,
  RawRequestInput,
} from "./types";

/** What ran: enough to open it again. */
export type HistoryRequest = {
  title: string;
  method: HttpMethod;
  environmentHost: string;
} & (
  | { type: "raw"; request: RawRequestInput }
  | {
      type: "operation";
      operation: { kind: OperationKind; name: string };
      input: OperationInput;
      flavour: CodeFlavour;
    }
);

export type HistoryEntry = HistoryRequest & {
  id: string;
  /** ISO time it ran. */
  at: string;
  /** Status of the last response; absent when none arrived. */
  status?: number;
  ok: boolean;
};

const KEY = "explorer-history";
const MAX = 50;

function isEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== "object") return false;
  const e = value as Partial<HistoryEntry>;
  return (
    typeof e.id === "string" &&
    typeof e.title === "string" &&
    (e.type === "raw" || e.type === "operation")
  );
}

export function readHistory(): HistoryEntry[] {
  const text = readLocal(KEY);
  if (!text) return [];
  try {
    const value: unknown = JSON.parse(text);
    return Array.isArray(value) ? value.filter(isEntry) : [];
  } catch {
    return [];
  }
}

/** `history` with `entry` first, at most 50 entries. */
export function addToHistory(history: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
  const next = [entry, ...history.filter((e) => e.id !== entry.id)].slice(0, MAX);
  writeLocal(KEY, JSON.stringify(next));
  return next;
}

export function clearHistory(): HistoryEntry[] {
  writeLocal(KEY, null);
  return [];
}
