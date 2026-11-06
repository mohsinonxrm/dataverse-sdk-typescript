import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcBotsShouldHaveCapacityRule request message
 *
 * Web API Action: msdyn_OcBotsShouldHaveCapacityRule
 */
export class msdyn_OcBotsShouldHaveCapacityRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcBotsShouldHaveCapacityRuleResponse>
{
  constructor() {
    super("msdyn_OcBotsShouldHaveCapacityRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcBotsShouldHaveCapacityRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcBotsShouldHaveCapacityRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcBotsShouldHaveCapacityRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OcBotsShouldHaveCapacityRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcBotsShouldHaveCapacityRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcBotsShouldHaveCapacityRule response message
 *
 * `result` is the value the msdyn_OcBotsShouldHaveCapacityRule action returns (see {@link msdyn_OcBotsShouldHaveCapacityRuleResult}).
 */
export class msdyn_OcBotsShouldHaveCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcBotsShouldHaveCapacityRuleResult) {
    super("msdyn_OcBotsShouldHaveCapacityRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OcBotsShouldHaveCapacityRuleResponse {
    return new msdyn_OcBotsShouldHaveCapacityRuleResponse(
      data as msdyn_OcBotsShouldHaveCapacityRuleResult
    );
  }
}
