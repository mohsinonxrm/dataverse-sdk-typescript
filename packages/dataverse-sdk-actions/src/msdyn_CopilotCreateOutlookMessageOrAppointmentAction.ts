import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopilotCreateOutlookMessageOrAppointment action
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentResponse {
  msdyn_error: string;
  msdyn_outlookResponse: string;
  msdyn_status: number;
}

/**
 * msdyn_CopilotCreateOutlookMessageOrAppointment action
 *
 * Unbound action
 */
export class msdyn_CopilotCreateOutlookMessageOrAppointmentAction implements Executable<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse> {
  constructor(
    public readonly msdyn_messageId: string,
    public readonly msdyn_correlationId: string,
    public readonly msdyn_outlookItemType: string,
    public readonly msdyn_outlookPayload: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopilotCreateOutlookMessageOrAppointment`;

    const body: Record<string, unknown> = {
      msdyn_messageId: this.msdyn_messageId,
      msdyn_correlationId: this.msdyn_correlationId,
      msdyn_outlookItemType: this.msdyn_outlookItemType,
      msdyn_outlookPayload: this.msdyn_outlookPayload,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse> {
    const data = await response.json();
    return data as msdyn_CopilotCreateOutlookMessageOrAppointmentResponse;
  }
}
