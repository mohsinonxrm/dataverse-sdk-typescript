import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetTransformationAgentEligibilityResponse as msdyn_GetTransformationAgentEligibilityResponseData } from "./types/index.js";

/**
 * msdyn_GetTransformationAgentEligibility request message
 *
 * Web API Action: msdyn_GetTransformationAgentEligibility
 */
export class msdyn_GetTransformationAgentEligibilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTransformationAgentEligibilityResponse>
{
  constructor() {
    super("msdyn_GetTransformationAgentEligibility");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTransformationAgentEligibility`;

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
  ): Promise<msdyn_GetTransformationAgentEligibilityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetTransformationAgentEligibilityResponse.fromResponse({});
    return msdyn_GetTransformationAgentEligibilityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetTransformationAgentEligibility response message
 */
export class msdyn_GetTransformationAgentEligibilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTransformationAgentEligibilityResponseData) {
    super("msdyn_GetTransformationAgentEligibility");
  }

  static fromResponse(data: unknown): msdyn_GetTransformationAgentEligibilityResponse {
    return new msdyn_GetTransformationAgentEligibilityResponse(
      responseObject<msdyn_GetTransformationAgentEligibilityResponseData>(data)
    );
  }
}
