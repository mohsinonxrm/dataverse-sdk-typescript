import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse as msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule response message
 */
export class msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponseData) {
    super("msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule");
  }

  static fromResponse(data: unknown): msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse {
    return new msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse(
      responseObject<msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponseData>(data)
    );
  }
}
