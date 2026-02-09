import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateRequirementGroupBookings action
 */
export interface msdyn_CreateRequirementGroupBookingsResponse {
  HandlerExecuted: boolean;
}

/**
 * msdyn_CreateRequirementGroupBookings action
 *
 * Unbound action
 */
export class msdyn_CreateRequirementGroupBookingsAction implements Executable<msdyn_CreateRequirementGroupBookingsResponse> {
  constructor(
    public readonly version: string,
    public readonly start: string,
    public readonly duration: number,
    public readonly resourceAssignments: Record<string, unknown>[],
    public readonly requirementGroup: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementGroupBookings`;

    const body: Record<string, unknown> = {
      Version: this.version,
      Start: this.start,
      Duration: this.duration,
      ResourceAssignments: this.resourceAssignments,
      RequirementGroup: this.requirementGroup,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementGroupBookingsResponse> {
    const data = await response.json();
    return data as msdyn_CreateRequirementGroupBookingsResponse;
  }
}
