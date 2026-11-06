import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateOutboundCall action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateOutboundCallResponse = void;

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

  parseResponse(_response: Response): Promise<CCaaS_InitiateOutboundCallResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
