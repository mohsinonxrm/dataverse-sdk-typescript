/**
 * msdyn_GetCopilotAgentStatusForEnvironmentResponse complex type
 */
export interface msdyn_GetCopilotAgentStatusForEnvironmentResponse {
  msdyn_isCopilotCrossGeoRequestEnabled?: boolean;
  msdyn_isBingChatEnabled?: boolean;
  IsSuccess?: boolean;
  ErrorMessage?: string;
  msdyn_isAgentEnabled?: boolean;
  msdyn_isM365TenantEnabled?: boolean;
  msdyn_isAgentCapacityEnabled?: boolean;
}
