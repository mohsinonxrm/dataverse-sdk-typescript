import type { DataverseClientOptions, DiagnosticHeaderOptions } from "../abstractions/options.js";

/** Which diagnostic headers to send, with defaults applied. */
export function resolveDiagnosticHeaders(
  option: DataverseClientOptions["diagnosticHeaders"]
): Required<DiagnosticHeaderOptions> {
  if (option === false) {
    return { sdkVersion: false, correlationId: false, featureUsage: false, retryAttempt: false };
  }
  const o = option === true || option === undefined ? {} : option;
  return {
    sdkVersion: o.sdkVersion ?? true,
    correlationId: o.correlationId ?? true,
    featureUsage: o.featureUsage ?? true,
    retryAttempt: o.retryAttempt ?? true,
  };
}
