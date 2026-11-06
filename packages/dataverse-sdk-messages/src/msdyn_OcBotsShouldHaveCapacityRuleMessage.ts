import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OcBotsShouldHaveCapacityRuleResponse as msdyn_OcBotsShouldHaveCapacityRuleResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OcBotsShouldHaveCapacityRuleResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_OcBotsShouldHaveCapacityRule response message
 */
export class msdyn_OcBotsShouldHaveCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcBotsShouldHaveCapacityRuleResponseData) {
    super("msdyn_OcBotsShouldHaveCapacityRule");
  }

  static fromResponse(data: unknown): msdyn_OcBotsShouldHaveCapacityRuleResponse {
    return new msdyn_OcBotsShouldHaveCapacityRuleResponse(
      responseObject<msdyn_OcBotsShouldHaveCapacityRuleResponseData>(data)
    );
  }
}
