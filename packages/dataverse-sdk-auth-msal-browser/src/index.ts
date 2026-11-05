/**
 * @module @mohsinonxrm/dataverse-sdk-auth-msal-browser
 * MSAL Browser authentication provider for Dataverse SDK
 */

export { MsalBrowserTokenProvider } from "./MsalBrowserTokenProvider.js";
export type {
  MsalBrowserTokenProviderOptions,
  InteractionType,
} from "./MsalBrowserTokenProvider.js";
export {
  isInteractionRequiredError,
  isPopupBlockedError,
  getMsalErrorCode,
  INTERACTION_REQUIRED_ERROR_CODES,
  POPUP_BLOCKED_ERROR_CODES,
  MsalBrowserAuthenticationError,
} from "./errors.js";
export type { MsalErrorLike, MsalErrorDetails } from "./errors.js";

// Re-export commonly used MSAL types for convenience
export type {
  AccountInfo,
  AuthenticationResult,
  PopupRequest,
  RedirectRequest,
  SilentRequest,
  EndSessionRequest,
} from "@azure/msal-browser";
