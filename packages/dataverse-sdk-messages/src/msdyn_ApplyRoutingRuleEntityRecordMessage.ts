import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ApplyRoutingRuleEntityRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ApplyRoutingRuleEntityRecordRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ApplyRoutingRuleEntityRecord request message
 *
 * Web API Action: msdyn_ApplyRoutingRuleEntityRecord
 */
export class msdyn_ApplyRoutingRuleEntityRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_ApplyRoutingRuleEntityRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_ApplyRoutingRuleEntityRecordRequestParameters>;

  constructor(parameters: msdyn_ApplyRoutingRuleEntityRecordRequestParameters) {
    super("msdyn_ApplyRoutingRuleEntityRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyRoutingRuleEntityRecord`;

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

  parseResponse(_response: Response): Promise<msdyn_ApplyRoutingRuleEntityRecordResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ApplyRoutingRuleEntityRecordResponse());
  }
}

/**
 * msdyn_ApplyRoutingRuleEntityRecord response message
 */
export class msdyn_ApplyRoutingRuleEntityRecordResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ApplyRoutingRuleEntityRecord");
  }

  static fromResponse(_data?: unknown): msdyn_ApplyRoutingRuleEntityRecordResponse {
    return new msdyn_ApplyRoutingRuleEntityRecordResponse();
  }
}
