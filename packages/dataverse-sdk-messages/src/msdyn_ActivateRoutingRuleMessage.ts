import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ActivateRoutingRule request message
 *
 * Web API Action: msdyn_ActivateRoutingRule
 */
export class msdyn_ActivateRoutingRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateRoutingRuleResponse>
{
  constructor(
    public msdyn_ownerId: string,
    public msdyn_routingRuleId: string
  ) {
    super("msdyn_ActivateRoutingRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateRoutingRule`;

    const body: Record<string, unknown> = {
      msdyn_ownerId: this.msdyn_ownerId,
      msdyn_routingRuleId: this.msdyn_routingRuleId,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateRoutingRuleResponse> {
    // No return value (204 No Content)
    return new msdyn_ActivateRoutingRuleResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_ownerId: this.msdyn_ownerId,
      msdyn_routingRuleId: this.msdyn_routingRuleId,
    };
  }
}

/**
 * msdyn_ActivateRoutingRule response message
 */
export class msdyn_ActivateRoutingRuleResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ActivateRoutingRule");
  }

  static fromResponse(_data: unknown): msdyn_ActivateRoutingRuleResponse {
    return new msdyn_ActivateRoutingRuleResponse();
  }
}
