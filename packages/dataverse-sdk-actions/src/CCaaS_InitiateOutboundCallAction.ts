import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateOutboundCall action
 */
export interface CCaaS_InitiateOutboundCallResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateOutboundCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateOutboundCallActionParameters {
  IsUserPhoneNumber: boolean;
  ParticipantType: string;
  CallerName: string;
  ApiVersion: string;
  ParticipantId: string;
  CallFrom: string;
}

/**
 * CCaaS_InitiateOutboundCall action
 *
 * Unbound action
 */
export class CCaaS_InitiateOutboundCallAction implements Executable<CCaaS_InitiateOutboundCallResponse> {
  constructor(public readonly parameters: CCaaS_InitiateOutboundCallActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_InitiateOutboundCall`;

    const body = requestBody({
      IsUserPhoneNumber: this.parameters.IsUserPhoneNumber,
      ParticipantType: this.parameters.ParticipantType,
      CallerName: this.parameters.CallerName,
      ApiVersion: this.parameters.ApiVersion,
      ParticipantId: this.parameters.ParticipantId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateOutboundCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_InitiateOutboundCallResponse;
    return (await response.json()) as CCaaS_InitiateOutboundCallResponse;
  }
}
