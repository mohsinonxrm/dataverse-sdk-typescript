import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OcQueuesShouldHaveAgentsRuleResponse as msdyn_OcQueuesShouldHaveAgentsRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcQueuesShouldHaveAgentsRuleResponse> {
    const data = await response.json();
    return msdyn_OcQueuesShouldHaveAgentsRuleResponse.fromResponse(data);
  }
}

/**
 * msdyn_OcQueuesShouldHaveAgentsRule response message
 */
export class msdyn_OcQueuesShouldHaveAgentsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcQueuesShouldHaveAgentsRuleResponseData) {
    super("msdyn_OcQueuesShouldHaveAgentsRule");
  }

  static fromResponse(data: unknown): msdyn_OcQueuesShouldHaveAgentsRuleResponse {
    return new msdyn_OcQueuesShouldHaveAgentsRuleResponse(
      responseObject<msdyn_OcQueuesShouldHaveAgentsRuleResponseData>(data)
    );
  }
}
