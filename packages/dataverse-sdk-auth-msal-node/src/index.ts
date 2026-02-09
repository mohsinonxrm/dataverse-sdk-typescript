/**
 * @module @mohsinonxrm/dataverse-sdk-auth-msal-node
 * MSAL Node authentication provider for Dataverse SDK
 */

export { MsalNodeTokenProvider } from "./MsalNodeTokenProvider.js";
export type {
  AuthFlow,
  MsalNodeTokenProviderOptions,
  MsalNodeTokenProviderOptionsBase,
  DeviceCodeFlowOptions,
  ClientCredentialsFlowOptions,
  AuthorizationCodeFlowOptions,
  UsernamePasswordFlowOptions,
  SilentFlowOptions,
} from "./MsalNodeTokenProvider.js";

// Re-export commonly used MSAL types for convenience
export type {
  AccountInfo,
  AuthenticationResult,
  DeviceCodeRequest,
  ClientCredentialRequest,
  AuthorizationCodeRequest,
  UsernamePasswordRequest,
  SilentFlowRequest,
} from "@azure/msal-node";
