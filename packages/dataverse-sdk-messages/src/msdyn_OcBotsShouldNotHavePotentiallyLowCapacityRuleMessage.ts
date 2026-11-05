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
    const data = await response.json();
    return msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule response message
 */
export class msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse) {
    super("msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule");
  }

  static fromResponse(data: unknown): msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse {
    return new msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse((data as any).value);
  }
}
