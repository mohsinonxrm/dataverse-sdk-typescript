import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateAgentTransferExternal action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateAgentTransferExternalResponse = void;

/**
 * Parameters of the CCaaS_InitiateAgentTransferExternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentTransferExternalActionParameters {
  ExternalReferenceType?: string;
  ApiVersion: string;
  ExternalReferenceId?: string;
  AgentName?: string;
  ExternalParticipantChannel: string;
  ExternalParticipantChannelType: string;
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
      ExternalReferenceType: this.parameters.ExternalReferenceType,
      ApiVersion: this.parameters.ApiVersion,
      ExternalReferenceId: this.parameters.ExternalReferenceId,
      AgentName: this.parameters.AgentName,
      ExternalParticipantChannel: this.parameters.ExternalParticipantChannel,
      ExternalParticipantChannelType: this.parameters.ExternalParticipantChannelType,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateAgentTransferExternalResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
