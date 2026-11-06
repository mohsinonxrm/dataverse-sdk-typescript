import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CopilotCreateOutlookMessageOrAppointmentResponse as msdyn_CopilotCreateOutlookMessageOrAppointmentResponseData } from "./types/index.js";

/**
 * msdyn_CopilotCreateOutlookMessageOrAppointment request message
 *
 * Web API Action: msdyn_CopilotCreateOutlookMessageOrAppointment
 */
export class msdyn_CopilotCreateOutlookMessageOrAppointmentRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse>
{
  constructor(
    public msdyn_messageId: string,
    public msdyn_correlationId: string,
    public msdyn_outlookItemType: string,
    public msdyn_outlookPayload: string
  ) {
    super("msdyn_CopilotCreateOutlookMessageOrAppointment");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse> {
    const data = await response.json();
    return msdyn_CopilotCreateOutlookMessageOrAppointmentResponse.fromResponse(data);
  }
}

/**
 * msdyn_CopilotCreateOutlookMessageOrAppointment response message
 */
export class msdyn_CopilotCreateOutlookMessageOrAppointmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_CopilotCreateOutlookMessageOrAppointmentResponseData) {
    super("msdyn_CopilotCreateOutlookMessageOrAppointment");
  }

  static fromResponse(data: unknown): msdyn_CopilotCreateOutlookMessageOrAppointmentResponse {
    return new msdyn_CopilotCreateOutlookMessageOrAppointmentResponse(
      responseObject<msdyn_CopilotCreateOutlookMessageOrAppointmentResponseData>(data)
    );
  }
}
