import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_BookingResourceRequirement action
 */
export interface msdyn_BookingResourceRequirementResponse {
  BookingResult: string;
}

/**
 * msdyn_BookingResourceRequirement action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_resourcerequirement)
 */
export class msdyn_BookingResourceRequirementAction implements Executable<msdyn_BookingResourceRequirementResponse> {
  constructor(
    public readonly msdyn_resourcerequirementId: string,
    public readonly resourceId: string,
    public readonly bookingStatusId: string,
    public readonly bookingMethod: number,
    public readonly bookingType: number,
    public readonly startDateTime: string,
    public readonly endDateTime: string,
    public readonly timeframe?: number,
    public readonly hours?: number,
    public readonly percentage?: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_resourcerequirements(${this.msdyn_resourcerequirementId})/Microsoft.Dynamics.CRM.msdyn_BookingResourceRequirement`;

    const body: Record<string, unknown> = {
      ResourceId: this.resourceId,
      BookingStatusId: this.bookingStatusId,
      BookingMethod: this.bookingMethod,
      BookingType: this.bookingType,
      StartDateTime: this.startDateTime,
      EndDateTime: this.endDateTime,
      Timeframe: this.timeframe,
      Hours: this.hours,
      Percentage: this.percentage,
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

  async parseResponse(response: Response): Promise<msdyn_BookingResourceRequirementResponse> {
    const data = await response.json();
    return data as msdyn_BookingResourceRequirementResponse;
  }
}
