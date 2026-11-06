import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcAgentsShouldHaveCapacityRule request message
 *
 * Web API Action: msdyn_OcAgentsShouldHaveCapacityRule
 */
export class msdyn_OcAgentsShouldHaveCapacityRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcAgentsShouldHaveCapacityRuleResponse>
{
  constructor() {
    super("msdyn_OcAgentsShouldHaveCapacityRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcAgentsShouldHaveCapacityRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcAgentsShouldHaveCapacityRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcAgentsShouldHaveCapacityRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OcAgentsShouldHaveCapacityRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcAgentsShouldHaveCapacityRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcAgentsShouldHaveCapacityRule response message
 *
 * `result` is the value the msdyn_OcAgentsShouldHaveCapacityRule action returns (see {@link msdyn_OcAgentsShouldHaveCapacityRuleResult}).
 */
export class msdyn_OcAgentsShouldHaveCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcAgentsShouldHaveCapacityRuleResult) {
    super("msdyn_OcAgentsShouldHaveCapacityRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OcAgentsShouldHaveCapacityRuleResponse {
    return new msdyn_OcAgentsShouldHaveCapacityRuleResponse(
      data as msdyn_OcAgentsShouldHaveCapacityRuleResult
    );
  }
}
