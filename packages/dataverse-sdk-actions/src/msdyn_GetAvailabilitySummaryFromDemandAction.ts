import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAvailabilitySummaryFromDemand action
 */
export interface msdyn_GetAvailabilitySummaryFromDemandResponse {
  ResourceAvailabilitySummary: string;
}

/**
 * msdyn_GetAvailabilitySummaryFromDemand action
 *
 * Unbound action
 */
export class msdyn_GetAvailabilitySummaryFromDemandAction implements Executable<msdyn_GetAvailabilitySummaryFromDemandResponse> {
  constructor(
    public readonly requirementIds: string,
    public readonly timescale: number,
    public readonly timeZoneCode: number,
    public readonly resourceIds: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly considerAppointments: boolean,
    public readonly ignoreTimeZone: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAvailabilitySummaryFromDemand`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
      TimeZoneCode: this.timeZoneCode,
      ResourceIds: this.resourceIds,
      StartDate: this.startDate,
      EndDate: this.endDate,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAvailabilitySummaryFromDemandResponse> {
    const data = await response.json();
    return data as msdyn_GetAvailabilitySummaryFromDemandResponse;
  }
}
