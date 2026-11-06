import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule response message
 *
 * `result` is the value the msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule action returns (see {@link msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResult}).
 */
export class msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResult) {
    super("msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse {
    return new msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse(
      data as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResult
    );
  }
}
