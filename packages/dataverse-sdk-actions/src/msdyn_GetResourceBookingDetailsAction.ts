import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetResourceBookingDetails action
 */
export interface msdyn_GetResourceBookingDetailsResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetResourceBookingDetailsResponse;
  }
}
