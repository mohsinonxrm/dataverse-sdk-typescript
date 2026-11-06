import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_BargeInToCall action
 */
export interface CCaaS_BargeInToCallResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_BargeInToCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BargeInToCallActionParameters {
  ApiVersion: string;
  SessionId: string;
  ParticipantType: string;
  ParticipantId: string;
  CallId: string;
}

/**
 * CCaaS_BargeInToCall action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_BargeInToCallAction implements Executable<CCaaS_BargeInToCallResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_BargeInToCallActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_BargeInToCall`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      SessionId: this.parameters.SessionId,
      ParticipantType: this.parameters.ParticipantType,
      ParticipantId: this.parameters.ParticipantId,
      CallId: this.parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_BargeInToCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_BargeInToCallResponse;
    return (await response.json()) as CCaaS_BargeInToCallResponse;
  }
}
