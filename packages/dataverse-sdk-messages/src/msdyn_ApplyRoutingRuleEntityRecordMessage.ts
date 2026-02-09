import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ApplyRoutingRuleEntityRecord request message
 *
 * Web API Action: msdyn_ApplyRoutingRuleEntityRecord
 */
export class msdyn_ApplyRoutingRuleEntityRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_ApplyRoutingRuleEntityRecordResponse>
{
  constructor(public target: EntityReference) {
    super("msdyn_ApplyRoutingRuleEntityRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyRoutingRuleEntityRecord`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ApplyRoutingRuleEntityRecordResponse> {
    // No return value (204 No Content)
    return new msdyn_ApplyRoutingRuleEntityRecordResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * msdyn_ApplyRoutingRuleEntityRecord response message
 */
export class msdyn_ApplyRoutingRuleEntityRecordResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ApplyRoutingRuleEntityRecord");
  }

  static fromResponse(_data: unknown): msdyn_ApplyRoutingRuleEntityRecordResponse {
    return new msdyn_ApplyRoutingRuleEntityRecordResponse();
  }
}
