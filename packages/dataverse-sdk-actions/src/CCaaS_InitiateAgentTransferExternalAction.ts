import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateAgentTransferExternal action
 */
export interface CCaaS_InitiateAgentTransferExternalResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateAgentTransferExternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentTransferExternalActionParameters {
  ExternalParticipantChannel: string;
  ExternalParticipantChannelType: string;
  AgentName?: string;
  ExternalReferenceId?: string;
  ExternalReferenceType?: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateAgentTransferExternal action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentTransferExternalAction implements Executable<CCaaS_InitiateAgentTransferExternalResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateAgentTransferExternalActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransferExternal`;

    const body = requestBody({
      ExternalParticipantChannel: this.parameters.ExternalParticipantChannel,
      ExternalParticipantChannelType: this.parameters.ExternalParticipantChannelType,
      AgentName: this.parameters.AgentName,
      ExternalReferenceId: this.parameters.ExternalReferenceId,
      ExternalReferenceType: this.parameters.ExternalReferenceType,
      ApiVersion: this.parameters.ApiVersion,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_InitiateAgentTransferExternalResponse;
  }
}
