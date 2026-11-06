import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_ExternalCallTransfer action
 */
export interface CCaaS_ExternalCallTransferResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_ExternalCallTransfer action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ExternalCallTransferActionParameters {
  CallId: string;
  ApiVersion: string;
  SessionId: string;
  ParticipantType: string;
  ParticipantId: string;
}

/**
 * CCaaS_ExternalCallTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ExternalCallTransferAction implements Executable<CCaaS_ExternalCallTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_ExternalCallTransferActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ExternalCallTransfer`;

    const body = requestBody({
      CallId: this.parameters.CallId,
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
      ParticipantType: this.parameters.ParticipantType,
      ParticipantId: this.parameters.ParticipantId,
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

  async parseResponse(response: Response): Promise<CCaaS_ExternalCallTransferResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_ExternalCallTransferResponse;
    return (await response.json()) as CCaaS_ExternalCallTransferResponse;
  }
}
