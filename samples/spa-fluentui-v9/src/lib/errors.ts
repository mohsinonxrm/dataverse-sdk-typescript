/**
 * Sort an error thrown by the SDK into the kind of card that explains it best. Uses `instanceof`
 * on the SDK's error classes: `name` isn't reliable (a network error's name is
 * `ConnectionFailed` or `RequestTimeout`, an abort's is `AbortError`).
 */
import {
  DataverseAbortError,
  DataverseAuthenticationError,
  DataverseError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseODataError,
  DataverseThrottleError,
} from "@mohsinonxrm/dataverse-sdk-core";
import { DataverseBatchError } from "@mohsinonxrm/dataverse-sdk-batch";

export type ClassifiedError =
  | { kind: "batch"; error: DataverseBatchError }
  | { kind: "throttle"; error: DataverseThrottleError }
  | { kind: "odata"; error: DataverseODataError }
  | { kind: "abort"; error: Error }
  | { kind: "network"; error: DataverseNetworkError }
  | { kind: "invalid"; error: DataverseInvalidRequestError }
  | { kind: "auth"; error: DataverseAuthenticationError }
  | { kind: "dataverse"; error: DataverseError }
  | { kind: "unknown"; error: Error };

export function classifyError(error: unknown): ClassifiedError {
  if (error instanceof DataverseBatchError) return { kind: "batch", error };
  if (error instanceof DataverseThrottleError) return { kind: "throttle", error };
  if (error instanceof DataverseODataError) return { kind: "odata", error };
  if (error instanceof DataverseAbortError) return { kind: "abort", error };
  if (error instanceof DOMException && error.name === "AbortError") return { kind: "abort", error };
  if (error instanceof DataverseNetworkError) return { kind: "network", error };
  if (error instanceof DataverseInvalidRequestError) return { kind: "invalid", error };
  if (error instanceof DataverseAuthenticationError) return { kind: "auth", error };
  if (error instanceof DataverseError) return { kind: "dataverse", error };
  if (error instanceof Error) return { kind: "unknown", error };
  return { kind: "unknown", error: new Error(String(error)) };
}
