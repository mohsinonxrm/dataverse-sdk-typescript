/**
 * Small shared types for the demo pages.
 */

/** A JSON object whose shape the page does not depend on (an OData entity, an action result). */
export type JsonObject = Record<string, unknown>;

/** The result panel of a scenario page: a label plus whatever the call returned. */
export type ResultView = JsonObject;

/** Progress shown by the ProgressTracker while a multi-step operation runs. */
export interface ProgressState {
  total: number;
  current: number;
  successCount: number;
  errorCount: number;
  /** Extra label/value pairs shown under the bar. */
  customStats?: { label: string; value: string | number }[];
}

/** A `setProgress` updater that merges `patch` into the previous state (or an empty one). */
export const patchProgress =
  (patch: Partial<ProgressState>) =>
  (prev: ProgressState | null): ProgressState => ({
    total: 0,
    current: 0,
    successCount: 0,
    errorCount: 0,
    ...prev,
    ...patch,
  });
