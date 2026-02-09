import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_BookRequirementGroup action
 */
export interface msdyn_BookRequirementGroupResponse {
  BookingResult: string;
}

/**
 * msdyn_BookRequirementGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_requirementgroup)
 */
export class msdyn_BookRequirementGroupAction implements Executable<msdyn_BookRequirementGroupResponse> {
  constructor(
    public readonly msdyn_requirementgroupId: string,
    public readonly start: string,
    public readonly duration: number,
    public readonly bookingResources: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_BookRequirementGroup`;

    const body: Record<string, unknown> = {
      Start: this.start,
      Duration: this.duration,
      BookingResources: this.bookingResources,
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

  async parseResponse(response: Response): Promise<msdyn_BookRequirementGroupResponse> {
    const data = await response.json();
    return data as msdyn_BookRequirementGroupResponse;
  }
}
