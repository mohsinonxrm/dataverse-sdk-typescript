import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResourceBookingDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceBookingDetailsResponse {
  "@odata.context"?: string;
  BookingDetailResult: string;
}

/**
 * Parameters of the msdyn_GetResourceBookingDetails action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceBookingDetailsActionParameters {
  StartDate: string;
  EndDate: string;
  Timescale: number;
  SchedulerSettings?: string;
  ConsiderAppointments?: boolean;
}

/**
 * msdyn_GetResourceBookingDetails action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bookableresource)
 *
 * The first argument is the id of the bookableresource record to call it on.
 */
export class msdyn_GetResourceBookingDetailsAction implements Executable<msdyn_GetResourceBookingDetailsResponse> {
  constructor(
    public readonly bookableresourceId: string,
    public readonly parameters: msdyn_GetResourceBookingDetailsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresources(${this.bookableresourceId})/Microsoft.Dynamics.CRM.msdyn_GetResourceBookingDetails`;

    const body = requestBody({
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      Timescale: this.parameters.Timescale,
      SchedulerSettings: this.parameters.SchedulerSettings,
      ConsiderAppointments: this.parameters.ConsiderAppointments,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourceBookingDetailsResponse;
  }
}
