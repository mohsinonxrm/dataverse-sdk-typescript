import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * Response from AddRecurrence action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface AddRecurrenceResponse extends recurringappointmentmaster {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * AddRecurrence action
 *
 * Bound action
 * Binding parameter: entity (mscrm.appointment)
 */
export class AddRecurrenceAction implements Executable<AddRecurrenceResponse> {
  constructor(
    public readonly appointmentId: string,
    public readonly target: recurringappointmentmaster
  ) {}

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
    return data as AddRecurrenceResponse;
  }
}
