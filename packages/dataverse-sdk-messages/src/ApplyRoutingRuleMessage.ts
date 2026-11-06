import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ApplyRoutingRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ApplyRoutingRuleRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ApplyRoutingRule request message
 *
 * Web API Action: ApplyRoutingRule
 */
export class ApplyRoutingRuleRequest
  extends OrganizationRequest
  implements Executable<ApplyRoutingRuleResponse>
{
  declare readonly Parameters: Readonly<ApplyRoutingRuleRequestParameters>;

  constructor(parameters: ApplyRoutingRuleRequestParameters) {
    super("ApplyRoutingRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRoutingRule`;

    const body = requestBody({
      Target: this.Parameters.Target,
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
