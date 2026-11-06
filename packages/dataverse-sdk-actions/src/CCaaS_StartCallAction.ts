import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_StartCall action
 */
export interface CCaaS_StartCallResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_StartCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartCallActionParameters {
  ClientId?: string;
  ParticipantId: string;
  CallerName: string;
  IsUserPhoneNumber: boolean;
  ApiVersion: string;
  ParticipantType: string;
  CallFrom: string;
}

/**
 * CCaaS_StartCall action
 *
 * Unbound action
 */
export class CCaaS_StartCallAction implements Executable<CCaaS_StartCallResponse> {
  constructor(public readonly parameters: CCaaS_StartCallActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_StartCall`;

    const body = requestBody({
      ClientId: this.parameters.ClientId,
      ParticipantId: this.parameters.ParticipantId,
      CallerName: this.parameters.CallerName,
      IsUserPhoneNumber: this.parameters.IsUserPhoneNumber,
      ApiVersion: this.parameters.ApiVersion,
      ParticipantType: this.parameters.ParticipantType,
      CallFrom: this.parameters.CallFrom,
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

  async parseResponse(response: Response): Promise<CCaaS_StartCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_StartCallResponse;
    return (await response.json()) as CCaaS_StartCallResponse;
  }
}
