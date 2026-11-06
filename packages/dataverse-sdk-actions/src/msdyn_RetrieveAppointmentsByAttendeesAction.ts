import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveAppointmentsByAttendees action
 */
export interface msdyn_RetrieveAppointmentsByAttendeesResponse {
  ExceptionMessage: string;
  HasChanges: boolean;
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveAppointmentsByAttendees action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveAppointmentsByAttendeesActionParameters {
  Version?: string;
  StartDate: string;
  EndDate: string;
  BookableResourceIds: string;
  OnlyRetrieveCompletedOrScheduled?: boolean;
  ModifiedOnDate?: string;
}

/**
 * msdyn_RetrieveAppointmentsByAttendees action
 *
 * Unbound action
 */
export class msdyn_RetrieveAppointmentsByAttendeesAction implements Executable<msdyn_RetrieveAppointmentsByAttendeesResponse> {
  constructor(public readonly parameters: msdyn_RetrieveAppointmentsByAttendeesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveAppointmentsByAttendees`;

    const body = requestBody({
      Version: this.parameters.Version,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      BookableResourceIds: this.parameters.BookableResourceIds,
      OnlyRetrieveCompletedOrScheduled: this.parameters.OnlyRetrieveCompletedOrScheduled,
      ModifiedOnDate: this.parameters.ModifiedOnDate,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveAppointmentsByAttendeesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveAppointmentsByAttendeesResponse;
    return (await response.json()) as msdyn_RetrieveAppointmentsByAttendeesResponse;
  }
}
