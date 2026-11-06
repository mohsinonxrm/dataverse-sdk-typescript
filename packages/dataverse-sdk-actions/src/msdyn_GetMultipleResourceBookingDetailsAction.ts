import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetMultipleResourceBookingDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMultipleResourceBookingDetailsResponse {
  "@odata.context"?: string;
  BookingDetailResult: string;
}

/**
 * Parameters of the msdyn_GetMultipleResourceBookingDetails action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMultipleResourceBookingDetailsActionParameters {
  StartDate: string;
  EndDate: string;
  Timescale: number;
  SchedulerSettings?: string;
  Targets: string;
  ConsiderAppointments?: boolean;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetMultipleResourceBookingDetails action
 *
 * Unbound action
 */
export class msdyn_GetMultipleResourceBookingDetailsAction implements Executable<msdyn_GetMultipleResourceBookingDetailsResponse> {
  constructor(
    public readonly parameters: msdyn_GetMultipleResourceBookingDetailsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetails`;

    const body = requestBody({
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      Timescale: this.parameters.Timescale,
      SchedulerSettings: this.parameters.SchedulerSettings,
      Targets: this.parameters.Targets,
      ConsiderAppointments: this.parameters.ConsiderAppointments,
      IgnoreTimeZone: this.parameters.IgnoreTimeZone,
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
  ): Promise<msdyn_GetMultipleResourceBookingDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetMultipleResourceBookingDetailsResponse;
  }
}
