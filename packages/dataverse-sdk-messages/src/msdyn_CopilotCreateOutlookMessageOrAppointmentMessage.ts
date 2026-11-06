import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CopilotCreateOutlookMessageOrAppointment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentRequestParameters {
  msdyn_outlookItemType: string;
  msdyn_outlookPayload: string;
  msdyn_messageId?: string;
  msdyn_correlationId?: string;
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
      msdyn_outlookItemType: this.Parameters.msdyn_outlookItemType,
      msdyn_outlookPayload: this.Parameters.msdyn_outlookPayload,
      msdyn_messageId: this.Parameters.msdyn_messageId,
      msdyn_correlationId: this.Parameters.msdyn_correlationId,
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
    return msdyn_CopilotCreateOutlookMessageOrAppointmentResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CopilotCreateOutlookMessageOrAppointment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CopilotCreateOutlookMessageOrAppointmentResult {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_outlookResponse: string;
  msdyn_status: number;
}

/**
 * msdyn_CopilotCreateOutlookMessageOrAppointment response message
 *
 * `result` is the value the msdyn_CopilotCreateOutlookMessageOrAppointment action returns (see {@link msdyn_CopilotCreateOutlookMessageOrAppointmentResult}).
 */
export class msdyn_CopilotCreateOutlookMessageOrAppointmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_CopilotCreateOutlookMessageOrAppointmentResult) {
    super("msdyn_CopilotCreateOutlookMessageOrAppointment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CopilotCreateOutlookMessageOrAppointmentResponse {
    return new msdyn_CopilotCreateOutlookMessageOrAppointmentResponse(
      data as msdyn_CopilotCreateOutlookMessageOrAppointmentResult
    );
  }
}
