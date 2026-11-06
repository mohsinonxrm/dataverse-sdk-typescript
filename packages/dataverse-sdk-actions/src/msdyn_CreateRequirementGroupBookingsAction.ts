import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CreateRequirementGroupBookings action
 */
export interface msdyn_CreateRequirementGroupBookingsResponse {
  HandlerExecuted: boolean;
}

/**
 * Parameters of the msdyn_CreateRequirementGroupBookings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRequirementGroupBookingsActionParameters {
  Version?: string;
  Start: string;
  Duration: number;
  ResourceAssignments: Record<string, unknown>[];
  RequirementGroup: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateRequirementGroupBookings action
 *
 * Unbound action
 */
export class msdyn_CreateRequirementGroupBookingsAction implements Executable<msdyn_CreateRequirementGroupBookingsResponse> {
  constructor(public readonly parameters: msdyn_CreateRequirementGroupBookingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementGroupBookings`;

    const body = requestBody({
      Version: this.parameters.Version,
      Start: this.parameters.Start,
      Duration: this.parameters.Duration,
      ResourceAssignments: this.parameters.ResourceAssignments,
      RequirementGroup: this.parameters.RequirementGroup,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementGroupBookingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateRequirementGroupBookingsResponse;
  }
}
