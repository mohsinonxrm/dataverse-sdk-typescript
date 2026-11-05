import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * AddRecurrence request message
 *
 * Web API Action: AddRecurrence
 */
export class AddRecurrenceRequest
  extends OrganizationRequest
  implements Executable<AddRecurrenceResponse>
{
  constructor(
    public appointmentId: string,
    public target: recurringappointmentmaster
  ) {
    super("AddRecurrence");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/appointments(${this.appointmentId})/Microsoft.Dynamics.CRM.AddRecurrence`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<AddRecurrenceResponse> {
    const data = await response.json();
    return AddRecurrenceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.appointmentId,
      Target: this.target,
    };
  }
}

/**
 * AddRecurrence response message
 */
export class AddRecurrenceResponse extends OrganizationResponse {
  constructor(public result: recurringappointmentmaster) {
    super("AddRecurrence");
  }

  static fromResponse(data: unknown): AddRecurrenceResponse {
    return new AddRecurrenceResponse((data as any).value);
  }
}
