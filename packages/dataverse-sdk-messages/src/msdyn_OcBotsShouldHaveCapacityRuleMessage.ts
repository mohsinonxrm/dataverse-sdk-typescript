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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcBotsShouldHaveCapacityRuleResponse> {
    const data = await response.json();
    return msdyn_OcBotsShouldHaveCapacityRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcBotsShouldHaveCapacityRule response message
 */
export class msdyn_OcBotsShouldHaveCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcBotsShouldHaveCapacityRuleResponse) {
    super("msdyn_OcBotsShouldHaveCapacityRule");
  }

  static fromResponse(data: unknown): msdyn_OcBotsShouldHaveCapacityRuleResponse {
    return new msdyn_OcBotsShouldHaveCapacityRuleResponse((data as any).value);
  }
}
