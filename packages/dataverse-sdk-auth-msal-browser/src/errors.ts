/**
 * @fileoverview Detection of MSAL errors without `instanceof`.
 *
 * `@azure/msal-browser` is a peer dependency: the app owns the MSAL copy, and it may be a
 * different major (or a different bundled copy) from the one this package was built against.
 * Error classes from two copies never match with `instanceof`, so errors are classified by
 * their `name` and `errorCode`, which are stable across MSAL 3, 4 and 5.
 */

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
