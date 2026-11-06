import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CopilotCreateOutlookMessageOrAppointment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentResponse {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_outlookResponse: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_CopilotCreateOutlookMessageOrAppointment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentActionParameters {
  msdyn_outlookItemType: string;
  msdyn_outlookPayload: string;
  msdyn_messageId?: string;
  msdyn_correlationId?: string;
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
      msdyn_outlookItemType: this.parameters.msdyn_outlookItemType,
      msdyn_outlookPayload: this.parameters.msdyn_outlookPayload,
      msdyn_messageId: this.parameters.msdyn_messageId,
      msdyn_correlationId: this.parameters.msdyn_correlationId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CopilotCreateOutlookMessageOrAppointmentResponse;
  }
}
