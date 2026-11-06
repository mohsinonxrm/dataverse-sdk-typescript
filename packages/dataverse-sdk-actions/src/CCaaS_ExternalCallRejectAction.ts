import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_ExternalCallReject action
 */
export interface CCaaS_ExternalCallRejectResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_ExternalCallReject action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ExternalCallRejectActionParameters {
  ApiVersion: string;
  SessionId: string;
  CallId: string;
  ParticipantId: string;
  ParticipantType: string;
}

/**
 * CCaaS_ExternalCallReject action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ExternalCallRejectAction implements Executable<CCaaS_ExternalCallRejectResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_ExternalCallRejectActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ExternalCallReject`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
      CallId: this.parameters.CallId,
      ParticipantId: this.parameters.ParticipantId,
      ParticipantType: this.parameters.ParticipantType,
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

  async parseResponse(response: Response): Promise<CCaaS_ExternalCallRejectResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_ExternalCallRejectResponse;
    return (await response.json()) as CCaaS_ExternalCallRejectResponse;
  }
}
