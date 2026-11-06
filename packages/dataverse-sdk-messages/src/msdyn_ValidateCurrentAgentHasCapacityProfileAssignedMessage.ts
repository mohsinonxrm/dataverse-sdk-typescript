import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse as msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse.fromResponse({});
    return msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_ValidateCurrentAgentHasCapacityProfileAssigned response message
 */
export class msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponseData) {
    super("msdyn_ValidateCurrentAgentHasCapacityProfileAssigned");
  }

  static fromResponse(data: unknown): msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse {
    return new msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse(
      responseObject<msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponseData>(data)
    );
  }
}
