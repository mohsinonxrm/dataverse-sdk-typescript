import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAvailabilitySummaryFromDemand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAvailabilitySummaryFromDemandResponse {
  "@odata.context"?: string;
  ResourceAvailabilitySummary: string;
}

/**
 * Parameters of the msdyn_GetAvailabilitySummaryFromDemand action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAvailabilitySummaryFromDemandActionParameters {
  RequirementIds: string;
  Timescale: number;
  TimeZoneCode: number;
  ResourceIds: string;
  StartDate: string;
  EndDate: string;
  ConsiderAppointments?: boolean;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetAvailabilitySummaryFromDemand action
 *
 * Unbound action
 */
export class msdyn_GetAvailabilitySummaryFromDemandAction implements Executable<msdyn_GetAvailabilitySummaryFromDemandResponse> {
  constructor(public readonly parameters: msdyn_GetAvailabilitySummaryFromDemandActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAvailabilitySummaryFromDemand`;

    const body = requestBody({
      RequirementIds: this.parameters.RequirementIds,
      Timescale: this.parameters.Timescale,
      TimeZoneCode: this.parameters.TimeZoneCode,
      ResourceIds: this.parameters.ResourceIds,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
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

  async parseResponse(response: Response): Promise<msdyn_GetAvailabilitySummaryFromDemandResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAvailabilitySummaryFromDemandResponse;
  }
}
