import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ValidateCurrentAgentHasCapacityProfileAssigned request message
 *
 * Web API Action: msdyn_ValidateCurrentAgentHasCapacityProfileAssigned
 */
export class msdyn_ValidateCurrentAgentHasCapacityProfileAssignedRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse>
{
  constructor() {
    super("msdyn_ValidateCurrentAgentHasCapacityProfileAssigned");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateCurrentAgentHasCapacityProfileAssigned`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_ValidateCurrentAgentHasCapacityProfileAssigned action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResult {
  "@odata.context"?: string;
  ActionResult: boolean;
}

/**
 * msdyn_ValidateCurrentAgentHasCapacityProfileAssigned response message
 *
 * `result` is the value the msdyn_ValidateCurrentAgentHasCapacityProfileAssigned action returns (see {@link msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResult}).
 */
export class msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResult) {
    super("msdyn_ValidateCurrentAgentHasCapacityProfileAssigned");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse {
    return new msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse(
      data as msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResult
    );
  }
}
