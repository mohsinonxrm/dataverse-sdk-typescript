import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CreateRequirementGroupBookings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateRequirementGroupBookingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateRequirementGroupBookingsResponse;
  }
}
