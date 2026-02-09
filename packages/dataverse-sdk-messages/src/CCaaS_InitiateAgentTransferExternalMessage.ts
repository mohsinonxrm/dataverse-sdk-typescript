import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentTransferExternal request message
 *
 * Web API Action: CCaaS_InitiateAgentTransferExternal
 */
export class CCaaS_InitiateAgentTransferExternalRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentTransferExternalResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public externalParticipantChannel: string,
    public externalParticipantChannelType: string,
    public agentName: string,
    public externalReferenceId: string,
    public externalReferenceType: string,
    public apiVersion: string
  ) {
    super("CCaaS_InitiateAgentTransferExternal");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentTransferExternalResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentTransferExternalResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ExternalParticipantChannel: this.externalParticipantChannel,
      ExternalParticipantChannelType: this.externalParticipantChannelType,
      AgentName: this.agentName,
      ExternalReferenceId: this.externalReferenceId,
      ExternalReferenceType: this.externalReferenceType,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_InitiateAgentTransferExternal response message
 */
export class CCaaS_InitiateAgentTransferExternalResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentTransferExternal");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentTransferExternalResponse {
    return new CCaaS_InitiateAgentTransferExternalResponse();
  }
}
