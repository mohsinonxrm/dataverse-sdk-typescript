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

/** True when `app` has the username/password (ROPC) flow, which MSAL Node has deprecated. */
export function hasUsernamePasswordFlow(app: unknown): boolean {
  return hasMethod(app, "acquireTokenByUsernamePassword");
}

function stringField(error: unknown, field: string): string | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }
  const value = (error as Record<string, unknown>)[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * A `DataverseAuthenticationError` that keeps what MSAL said: its `errorCode`, `subError`,
 * `correlationId` and `errorNo`, and the original error as `cause`. Same fields as the browser
 * package's `MsalBrowserAuthenticationError`.
 *
 * It is still `instanceof DataverseAuthenticationError`, so existing handling keeps working.
 */
export class MsalNodeAuthenticationError extends DataverseAuthenticationError {
  /** MSAL's `errorCode` when there is one (same value as `errorCode`). */
  readonly code?: string;
  /** MSAL `errorCode`, e.g. `invalid_grant`, `invalid_client` or `authorization_pending`. */
  readonly errorCode?: string;
  /** MSAL `subError`, e.g. `basic_action` or `consent_required`. */
  readonly subError?: string;
  /** Correlation id of the MSAL request, for support. */
  readonly correlationId?: string;
  /** Entra ID error number from a server error, e.g. `7000215` for AADSTS7000215. */
  readonly errorNo?: string;

  constructor(message: string, cause?: unknown) {
    super(message, cause instanceof Error ? cause : undefined);
    Object.setPrototypeOf(this, MsalNodeAuthenticationError.prototype);
    this.name = "TokenAcquisitionFailed";
    this.errorCode = stringField(cause, "errorCode");
    this.subError = stringField(cause, "subError");
    this.correlationId = stringField(cause, "correlationId");
    this.errorNo = stringField(cause, "errorNo");
    this.code = this.errorCode;
    if (cause !== undefined && !(cause instanceof Error)) {
      this.cause = cause;
    }
  }
}

/**
 * Wraps an MSAL failure as `MsalNodeAuthenticationError` (`name` `"TokenAcquisitionFailed"`),
 * with MSAL's `errorCode`, `subError`, `correlationId` and `errorNo` on the error and the MSAL
 * error as `cause`.
 */
export function tokenAcquisitionFailed(
  error: unknown,
  details?: string
): MsalNodeAuthenticationError {
  const reason = details ?? (error instanceof Error ? error.message : String(error));
  return new MsalNodeAuthenticationError(`Failed to acquire access token: ${reason}`, error);
}
