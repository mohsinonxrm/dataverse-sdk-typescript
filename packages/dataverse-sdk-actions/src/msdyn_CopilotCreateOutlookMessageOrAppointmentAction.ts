import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CopilotCreateOutlookMessageOrAppointment action
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentResponse {
  msdyn_error: string;
  msdyn_outlookResponse: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_CopilotCreateOutlookMessageOrAppointment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentActionParameters {
  msdyn_messageId?: string;
  msdyn_correlationId?: string;
  msdyn_outlookItemType: string;
  msdyn_outlookPayload: string;
}

/**
 * msdyn_CopilotCreateOutlookMessageOrAppointment action
 *
 * Unbound action
 */
export class msdyn_CopilotCreateOutlookMessageOrAppointmentAction implements Executable<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse> {
  constructor(
    public readonly parameters: msdyn_CopilotCreateOutlookMessageOrAppointmentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopilotCreateOutlookMessageOrAppointment`;

    const body = requestBody({
      msdyn_messageId: this.parameters.msdyn_messageId,
      msdyn_correlationId: this.parameters.msdyn_correlationId,
      msdyn_outlookItemType: this.parameters.msdyn_outlookItemType,
      msdyn_outlookPayload: this.parameters.msdyn_outlookPayload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CopilotCreateOutlookMessageOrAppointmentResponse;
  }
}
