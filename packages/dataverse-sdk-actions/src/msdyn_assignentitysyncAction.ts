import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_assignentitysync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_assignentitysyncResponse {
  "@odata.context"?: string;
  AssignmentPassed: boolean;
}

/**
 * Parameters of the msdyn_assignentitysync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_assignentitysyncActionParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SegmentId: string;
}

/**
 * msdyn_assignentitysync action
 *
 * Unbound action
 */
export class msdyn_assignentitysyncAction implements Executable<msdyn_assignentitysyncResponse> {
  constructor(public readonly parameters: msdyn_assignentitysyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentitysync`;

    const body = requestBody({
      RegardingEntityId: this.parameters.RegardingEntityId,
      RegardingEntityName: this.parameters.RegardingEntityName,
      SegmentId: this.parameters.SegmentId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentitysyncResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_assignentitysyncResponse;
  }
}
