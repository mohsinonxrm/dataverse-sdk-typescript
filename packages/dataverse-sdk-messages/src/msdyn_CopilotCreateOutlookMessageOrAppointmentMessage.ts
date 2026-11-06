import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CopilotCreateOutlookMessageOrAppointmentResponse as msdyn_CopilotCreateOutlookMessageOrAppointmentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CopilotCreateOutlookMessageOrAppointment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentRequestParameters {
  msdyn_messageId?: string;
  msdyn_correlationId?: string;
  msdyn_outlookItemType: string;
  msdyn_outlookPayload: string;
}

/**
 * msdyn_CopilotCreateOutlookMessageOrAppointment request message
 *
 * Web API Action: msdyn_CopilotCreateOutlookMessageOrAppointment
 */
export class msdyn_CopilotCreateOutlookMessageOrAppointmentRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopilotCreateOutlookMessageOrAppointmentResponse>
{
  declare readonly Parameters: Readonly<msdyn_CopilotCreateOutlookMessageOrAppointmentRequestParameters>;

  constructor(parameters: msdyn_CopilotCreateOutlookMessageOrAppointmentRequestParameters) {
    super("msdyn_CopilotCreateOutlookMessageOrAppointment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopilotCreateOutlookMessageOrAppointment`;

    const body = requestBody({
      msdyn_messageId: this.Parameters.msdyn_messageId,
      msdyn_correlationId: this.Parameters.msdyn_correlationId,
      msdyn_outlookItemType: this.Parameters.msdyn_outlookItemType,
      msdyn_outlookPayload: this.Parameters.msdyn_outlookPayload,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CopilotCreateOutlookMessageOrAppointmentResponse.fromResponse({});
    return msdyn_CopilotCreateOutlookMessageOrAppointmentResponse.fromResponse(
      await response.json()
    );
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
