import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponseData } from "./types/index.js";

/**
 * msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule request message
 *
 * Web API Action: msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule
 */
export class msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule`;

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
  ): Promise<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse> {
    const data = await response.json();
    return msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse.fromResponse(data);
  }
}

/**
 * msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule response message
 */
export class msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponseData) {
    super("msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse {
    return new msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse(
      responseObject<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponseData>(data)
    );
  }
}
