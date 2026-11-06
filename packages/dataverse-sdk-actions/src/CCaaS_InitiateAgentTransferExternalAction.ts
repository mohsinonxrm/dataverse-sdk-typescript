import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateAgentTransferExternal action
 */
export interface CCaaS_InitiateAgentTransferExternalResponse {
  // No content returned
}

/**
 * CCaaS_InitiateAgentTransferExternal action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateAgentTransferExternalAction implements Executable<CCaaS_InitiateAgentTransferExternalResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly externalParticipantChannel: string,
    public readonly externalParticipantChannelType: string,
    public readonly agentName: string | undefined,
    public readonly externalReferenceId: string | undefined,
    public readonly externalReferenceType: string | undefined,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransferExternal`;

    const body: Record<string, unknown> = {
      ExternalParticipantChannel: this.externalParticipantChannel,
      ExternalParticipantChannelType: this.externalParticipantChannelType,
      AgentName: this.agentName,
      ExternalReferenceId: this.externalReferenceId,
      ExternalReferenceType: this.externalReferenceType,
      ApiVersion: this.apiVersion,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentTransferExternalResponse> {
    // No return value (204 No Content)
    return {};
  }
}
