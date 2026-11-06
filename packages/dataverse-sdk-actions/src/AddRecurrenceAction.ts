import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * Response from the AddRecurrence action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type AddRecurrenceResponse =
  | (recurringappointmentmaster & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * Parameters of the AddRecurrence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddRecurrenceActionParameters {
  Target: EntityReference | EntityPayload<recurringappointmentmaster>;
}

/**
 * AddRecurrence action
 *
 * Bound action
 * Binding parameter: entity (mscrm.appointment)
 *
 * The first argument is the id of the appointment record to call it on.
 */
export class AddRecurrenceAction implements Executable<AddRecurrenceResponse> {
  constructor(
    public readonly appointmentId: string,
    public readonly parameters: AddRecurrenceActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/appointments(${this.appointmentId})/Microsoft.Dynamics.CRM.AddRecurrence`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<AddRecurrenceResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as AddRecurrenceResponse;
  }
}
