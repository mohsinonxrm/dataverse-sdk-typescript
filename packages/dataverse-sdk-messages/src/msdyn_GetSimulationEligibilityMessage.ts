import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSimulationEligibilityResponse as msdyn_GetSimulationEligibilityResponseData } from "./types/index.js";

/**
 * msdyn_GetSimulationEligibility request message
 *
 * Web API Action: msdyn_GetSimulationEligibility
 */
export class msdyn_GetSimulationEligibilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSimulationEligibilityResponse>
{
  constructor() {
    super("msdyn_GetSimulationEligibility");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSimulationEligibility`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSimulationEligibilityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSimulationEligibilityResponse.fromResponse({});
    return msdyn_GetSimulationEligibilityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSimulationEligibility response message
 */
export class msdyn_GetSimulationEligibilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSimulationEligibilityResponseData) {
    super("msdyn_GetSimulationEligibility");
  }

  static fromResponse(data: unknown): msdyn_GetSimulationEligibilityResponse {
    return new msdyn_GetSimulationEligibilityResponse(
      responseObject<msdyn_GetSimulationEligibilityResponseData>(data)
    );
  }
}
