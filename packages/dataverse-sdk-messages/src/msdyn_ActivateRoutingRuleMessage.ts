import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ActivateRoutingRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateRoutingRuleRequestParameters {
  msdyn_ownerId: string;
  msdyn_routingRuleId: string;
}

/**
 * msdyn_ActivateRoutingRule request message
 *
 * Web API Action: msdyn_ActivateRoutingRule
 */
export class msdyn_ActivateRoutingRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateRoutingRuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActivateRoutingRuleRequestParameters>;

  constructor(parameters: msdyn_ActivateRoutingRuleRequestParameters) {
    super("msdyn_ActivateRoutingRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateRoutingRule`;

    const body = requestBody({
      msdyn_ownerId: this.Parameters.msdyn_ownerId,
      msdyn_routingRuleId: this.Parameters.msdyn_routingRuleId,
    });

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
