/**
 * Names of the Dataverse request headers that change how a request runs (Dataverse calls them
 * optional parameters). Pass one to `header()`, which then completes and checks its value, or use
 * it as a key of `RequestOptions.headers`:
 *
 * ```typescript
 * await client
 *   .api("accounts")
 *   .header(DataverseHeaders.BypassBusinessLogicExecution, "CustomSync,CustomAsync")
 *   .header(DataverseHeaders.SuppressCallbackRegistrationExpanderJob, "true")
 *   .post(account);
 * ```
 *
 * Header names are case-insensitive. Most of these need a privilege; see
 * https://learn.microsoft.com/power-apps/developer/data-platform/optional-parameters.
 */
export const DataverseHeaders = {
  /**
   * Skip custom synchronous (`CustomSync`) and/or asynchronous (`CustomAsync`) logic: plug-ins and
   * workflows. Needs `prvBypassCustomBusinessLogic`.
   */
  BypassBusinessLogicExecution: "MSCRM.BypassBusinessLogicExecution",
  /** Skip the plug-in steps with these ids (comma-separated `sdkmessageprocessingstepid`s). */
  BypassBusinessLogicExecutionStepIds: "MSCRM.BypassBusinessLogicExecutionStepIds",
  /** `true` skips custom synchronous plug-ins. Needs `prvBypassCustomPlugins`. */
  BypassCustomPluginExecution: "MSCRM.BypassCustomPluginExecution",
  /** `true` doesn't start the Power Automate flows the operation would trigger. */
  SuppressCallbackRegistrationExpanderJob: "MSCRM.SuppressCallbackRegistrationExpanderJob",
  /**
   * `false` runs duplicate detection on create and update (`detectDuplicates()` sets it). A
   * duplicate is a 412 `DataverseDuplicateError`.
   */
  SuppressDuplicateDetection: "MSCRM.SuppressDuplicateDetection",
  /** The unmanaged solution a new solution component (table, column, …) is added to. */
  SolutionUniqueName: "MSCRM.SolutionUniqueName",
  /**
   * `true` merges the labels of an updated definition with its other languages' labels; `false`
   * replaces them.
   */
  MergeLabels: "MSCRM.MergeLabels",
  /** An elastic table's session token, for reads that include this session's writes. */
  SessionToken: "MSCRM.SessionToken",
  /** `Strong` reads metadata from the database, not a cached copy that may predate a change. */
  Consistency: "Consistency",
  /** Impersonate the user with this Entra ID object id (`impersonateByObjectId()` sets it). */
  CallerObjectId: "CallerObjectId",
  /** Impersonate the user with this `systemuserid` (`impersonate()` sets it). */
  CallerId: "MSCRMCallerID",
} as const;

/** A header name from `DataverseHeaders`. */
export type DataverseHeaders = (typeof DataverseHeaders)[keyof typeof DataverseHeaders];

/** The values Dataverse documents for the headers in `DataverseHeaders` that take a fixed set. */
export interface DataverseHeaderValues {
  "MSCRM.BypassBusinessLogicExecution": "CustomSync" | "CustomAsync" | "CustomSync,CustomAsync";
  "MSCRM.BypassCustomPluginExecution": "true" | "false";
  "MSCRM.SuppressCallbackRegistrationExpanderJob": "true" | "false";
  "MSCRM.SuppressDuplicateDetection": "true" | "false";
  "MSCRM.MergeLabels": "true" | "false";
  Consistency: "Strong";
}

/**
 * The value `header(name, value)` takes for `name`: the documented values for a header in
 * `DataverseHeaderValues` (completed by the editor; any other string is still accepted), any
 * string otherwise.
 */
export type DataverseHeaderValue<TName extends string> = TName extends keyof DataverseHeaderValues
  ? DataverseHeaderValues[TName] | (string & {})
  : string;
