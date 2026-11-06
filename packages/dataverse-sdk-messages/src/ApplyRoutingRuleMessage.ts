import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * ApplyRoutingRule request message
 *
 * Web API Action: ApplyRoutingRule
 */
export class ApplyRoutingRuleRequest
  extends OrganizationRequest
  implements Executable<ApplyRoutingRuleResponse>
{
  constructor(public target: EntityReference) {
    super("ApplyRoutingRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRoutingRule`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ApplyRoutingRuleResponse> {
    // No return value (204 No Content)
    return new ApplyRoutingRuleResponse();
  }
}

/**
 * ApplyRoutingRule response message
 */
export class ApplyRoutingRuleResponse extends OrganizationResponse {
  constructor() {
    super("ApplyRoutingRule");
  }

  static fromResponse(_data: unknown): ApplyRoutingRuleResponse {
    return new ApplyRoutingRuleResponse();
  }
}
