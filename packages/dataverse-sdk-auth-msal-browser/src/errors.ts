/**
 * @fileoverview Detection of MSAL errors without `instanceof`.
 *
 * `@azure/msal-browser` is a peer dependency: the app owns the MSAL copy, and it may be a
 * different major (or a different bundled copy) from the one this package was built against.
 * Error classes from two copies never match with `instanceof`, so errors are classified by
 * their `name` and `errorCode`, which are stable across MSAL 3, 4 and 5.
 */

import { DataverseAuthenticationError } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * MSAL error codes that mean the user must interact (sign in, consent, MFA) before a token can be
 * issued. The server codes match `InteractionRequiredServerErrorMessage` in `@azure/msal-common`,
 * the others are the MSAL-defined codes that `InteractionRequiredAuthError` carries.
 */
export const INTERACTION_REQUIRED_ERROR_CODES: ReadonlySet<string> = new Set([
  // Server-originated
  "interaction_required",
  "consent_required",
  "login_required",
  "bad_token",
  "ui_not_allowed",
  "interrupted_user",
  // MSAL-defined
  "no_tokens_found",
  "native_account_unavailable",
  "refresh_token_expired",
  // No signed-in account: BrowserAuthError("no_account_error") from acquireTokenSilent. The user
  // has to sign in, which is an interaction.
  "no_account_error",
  "no_account",
]);

/**
 * MSAL codes for a popup that the browser blocked or that never loaded, so the user saw nothing.
 * `user_cancelled` (the user closed the popup) is deliberately not here.
 */
export const POPUP_BLOCKED_ERROR_CODES: ReadonlySet<string> = new Set([
  "popup_window_error",
  "empty_window_error",
]);

/**
 * The fields MSAL's `AuthError` (and subclasses) expose. Every field is optional because the value
 * may come from any MSAL version, or not be an MSAL error at all.
 */
export interface MsalErrorLike {
  name?: unknown;
  errorCode?: unknown;
  subError?: unknown;
  correlationId?: unknown;
  errorNo?: unknown;
  message?: unknown;
}

function asMsalError(error: unknown): MsalErrorLike | undefined {
  return typeof error === "object" && error !== null ? error : undefined;
}

/**
 * Reads MSAL's `errorCode` from an error of any MSAL version.
 */
export function getMsalErrorCode(error: unknown): string | undefined {
  const code = asMsalError(error)?.errorCode;
  return typeof code === "string" && code.length > 0 ? code : undefined;
}

/**
 * True when `error` means the user has to interact before a token can be issued.
 *
 * Works for errors thrown by any copy of `@azure/msal-browser` 3, 4 or 5: it checks
 * `name === "InteractionRequiredAuthError"` and the MSAL `errorCode`, never `instanceof`.
 */
export function isInteractionRequiredError(error: unknown): boolean {
  const err = asMsalError(error);
  if (!err) {
    return false;
  }
  if (err.name === "InteractionRequiredAuthError") {
    return true;
  }
  const code = getMsalErrorCode(err);
  return code !== undefined && INTERACTION_REQUIRED_ERROR_CODES.has(code);
}

/**
 * True when `error` means the browser blocked the sign-in popup (`popup_window_error`,
 * `empty_window_error`), from any MSAL copy.
 */
export function isPopupBlockedError(error: unknown): boolean {
  const code = getMsalErrorCode(error);
  return code !== undefined && POPUP_BLOCKED_ERROR_CODES.has(code);
}

function stringField(error: unknown, field: keyof MsalErrorLike): string | undefined {
  const value = asMsalError(error)?.[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Details copied from the MSAL error that caused a failure.
 */
export interface MsalErrorDetails {
  /** MSAL `errorCode`, e.g. `consent_required` or `popup_window_error`. */
  errorCode?: string;
  /** MSAL `subError`, e.g. `consent_required` or `basic_action`. */
  subError?: string;
  /** Correlation id of the MSAL request, for support. */
  correlationId?: string;
  /** Entra ID error number from a server error, e.g. `65001` for AADSTS65001 (consent needed). */
  errorNo?: string;
}

/**
 * A `DataverseAuthenticationError` that keeps what MSAL said: `code`, the MSAL `errorCode`,
 * `subError`, `correlationId`, and the original error as `cause`.
 *
 * It is still `instanceof DataverseAuthenticationError`, so existing handling keeps working.
 */
export class MsalBrowserAuthenticationError extends DataverseAuthenticationError {
  /**
   * A stable code for this failure: `popup_blocked` for a blocked popup, otherwise the MSAL
   * `errorCode` when there is one.
   */
  readonly code?: string;
  readonly errorCode?: string;
  readonly subError?: string;
  readonly correlationId?: string;
  readonly errorNo?: string;

  constructor(message: string, init: { name: string; code?: string; cause?: unknown }) {
    super(message);
    Object.setPrototypeOf(this, MsalBrowserAuthenticationError.prototype);
    this.name = init.name;
    this.errorCode = stringField(init.cause, "errorCode");
    this.subError = stringField(init.cause, "subError");
    this.correlationId = stringField(init.cause, "correlationId");
    this.errorNo = stringField(init.cause, "errorNo");
    this.code = init.code ?? this.errorCode;
    if (init.cause !== undefined) {
      this.cause = init.cause;
    }
  }

  /**
   * MSAL (or anything else) failed to issue a token. `code`/`errorCode` hold MSAL's error code,
   * for example `consent_required` or `user_cancelled`.
   */
  static tokenAcquisitionFailed(cause: unknown): MsalBrowserAuthenticationError {
    const details =
      cause instanceof Error ? cause.message : typeof cause === "string" ? cause : String(cause);
    return new MsalBrowserAuthenticationError(
      `Failed to acquire access token${details ? ": " + details : ""}`,
      { name: "TokenAcquisitionFailed", cause }
    );
  }

  /**
   * The browser blocked the sign-in popup. Start sign-in from a user gesture (a button click),
   * or set `fallbackToRedirect: true`.
   */
  static popupBlocked(cause: unknown): MsalBrowserAuthenticationError {
    return new MsalBrowserAuthenticationError(
      "Failed to acquire access token: the browser blocked the sign-in popup. " +
        "Start sign-in from a user action (for example a button click), " +
        "or set fallbackToRedirect: true to use a redirect instead.",
      { name: "PopupBlocked", code: "popup_blocked", cause }
    );
  }
}
