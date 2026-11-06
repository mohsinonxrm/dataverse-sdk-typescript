/**
 * @fileoverview Classifies MSAL errors and client applications without `instanceof`.
 *
 * `@azure/msal-node` is a peer dependency: the app owns the MSAL copy, and it may be a different
 * major (or a second installed copy) from the one this package was built against. Classes from two
 * copies never match with `instanceof`, so errors are classified by `name` and `errorCode`, and
 * client applications by the methods they have.
 */

import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * MSAL error codes that mean the cached account can't get a token silently, so the flow that
 * signed the user in has to run again. The server codes match `InteractionRequiredServerErrorMessage`
 * in `@azure/msal-common`, the others are the codes MSAL's `InteractionRequiredAuthError` carries.
 */
const INTERACTION_REQUIRED_ERROR_CODES: ReadonlySet<string> = new Set([
  "interaction_required",
  "consent_required",
  "login_required",
  "bad_token",
  "ui_not_allowed",
  "interrupted_user",
  "no_tokens_found",
  "native_account_unavailable",
  "refresh_token_expired",
]);

/** True when `error`, from any MSAL copy, means the silent call needs a new sign-in. */
export function isInteractionRequiredError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  const { name, errorCode } = error as { name?: unknown; errorCode?: unknown };
  if (name === "InteractionRequiredAuthError") {
    return true;
  }
  return typeof errorCode === "string" && INTERACTION_REQUIRED_ERROR_CODES.has(errorCode);
}

function hasMethod(app: unknown, method: string): boolean {
  return (
    typeof app === "object" &&
    app !== null &&
    typeof (app as Record<string, unknown>)[method] === "function"
  );
}

/** True for a `PublicClientApplication` from any MSAL copy (only it has device code). */
export function isPublicClientApplication(app: unknown): boolean {
  return hasMethod(app, "acquireTokenByDeviceCode");
}

/** True for a `ConfidentialClientApplication` from any MSAL copy (only it has client credentials). */
export function isConfidentialClientApplication(app: unknown): boolean {
  return hasMethod(app, "acquireTokenByClientCredential");
}

/**
 * Wraps an MSAL failure as `DataverseAuthenticationError` (`name` `"TokenAcquisitionFailed"`),
 * keeping the MSAL error as `cause` so its `errorCode`, `subError` and `correlationId` stay
 * available.
 */
export function tokenAcquisitionFailed(
  error: unknown,
  details?: string
): DataverseAuthenticationError {
  const reason = details ?? (error instanceof Error ? error.message : String(error));
  const wrapped = new DataverseAuthenticationError(
    `Failed to acquire access token: ${reason}`,
    error instanceof Error ? error : undefined
  );
  wrapped.name = "TokenAcquisitionFailed";
  return wrapped;
}
