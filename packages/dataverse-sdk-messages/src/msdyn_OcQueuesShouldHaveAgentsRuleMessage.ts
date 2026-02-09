import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcQueuesShouldHaveAgentsRule request message
 *
 * Web API Action: msdyn_OcQueuesShouldHaveAgentsRule
 */
export class msdyn_OcQueuesShouldHaveAgentsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcQueuesShouldHaveAgentsRuleResponse>
{
  constructor() {
    super("msdyn_OcQueuesShouldHaveAgentsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcQueuesShouldHaveAgentsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcQueuesShouldHaveAgentsRuleResponse> {
    const data = await response.json();
    return msdyn_OcQueuesShouldHaveAgentsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcQueuesShouldHaveAgentsRule response message
 */
export class msdyn_OcQueuesShouldHaveAgentsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcQueuesShouldHaveAgentsRuleResponse) {
    super("msdyn_OcQueuesShouldHaveAgentsRule");
  }

  static fromResponse(data: unknown): msdyn_OcQueuesShouldHaveAgentsRuleResponse {
    return new msdyn_OcQueuesShouldHaveAgentsRuleResponse((data as any).value);
  }
}
