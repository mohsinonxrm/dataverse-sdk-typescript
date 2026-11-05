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
    const data = await response.json();
    return msdyn_OcAgentsShouldHaveCapacityRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcAgentsShouldHaveCapacityRule response message
 */
export class msdyn_OcAgentsShouldHaveCapacityRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcAgentsShouldHaveCapacityRuleResponse) {
    super("msdyn_OcAgentsShouldHaveCapacityRule");
  }

  static fromResponse(data: unknown): msdyn_OcAgentsShouldHaveCapacityRuleResponse {
    return new msdyn_OcAgentsShouldHaveCapacityRuleResponse((data as any).value);
  }
}
