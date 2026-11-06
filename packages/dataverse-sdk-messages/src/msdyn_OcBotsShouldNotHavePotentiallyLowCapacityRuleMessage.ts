import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule request message
 *
 * Web API Action: msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule
 */
export class msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse>
{
  constructor() {
    super("msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule`;

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
  ): Promise<msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule response message
 *
 * `result` is the value the msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule action returns (see {@link msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResult}).
 */
export class msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResult) {
    super("msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse {
    return new msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse(
      data as msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResult
    );
  }
}
