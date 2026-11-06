import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetDefaultAgentSelectionCriteriaResponse as msdyn_GetDefaultAgentSelectionCriteriaResponseData } from "./types/index.js";

/**
 * msdyn_GetDefaultAgentSelectionCriteria request message
 *
 * Web API Action: msdyn_GetDefaultAgentSelectionCriteria
 */
export class msdyn_GetDefaultAgentSelectionCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDefaultAgentSelectionCriteriaResponse>
{
  constructor() {
    super("msdyn_GetDefaultAgentSelectionCriteria");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDefaultAgentSelectionCriteria`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetDefaultAgentSelectionCriteriaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetDefaultAgentSelectionCriteriaResponse.fromResponse({});
    return msdyn_GetDefaultAgentSelectionCriteriaResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetDefaultAgentSelectionCriteria response message
 */
export class msdyn_GetDefaultAgentSelectionCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDefaultAgentSelectionCriteriaResponseData) {
    super("msdyn_GetDefaultAgentSelectionCriteria");
  }

  static fromResponse(data: unknown): msdyn_GetDefaultAgentSelectionCriteriaResponse {
    return new msdyn_GetDefaultAgentSelectionCriteriaResponse(
      responseObject<msdyn_GetDefaultAgentSelectionCriteriaResponseData>(data)
    );
  }
}
