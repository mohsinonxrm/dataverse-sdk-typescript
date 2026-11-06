import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization, team } from "./types/index.js";

/**
 * Parameters of the ProvisionDelegation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionDelegationRequestParameters {
  delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>;
}

/**
 * ProvisionDelegation request message
 *
 * Web API Action: ProvisionDelegation
 */
export class ProvisionDelegationRequest
  extends OrganizationRequest
  implements Executable<ProvisionDelegationResponse>
{
  declare readonly Parameters: Readonly<ProvisionDelegationRequestParameters>;

  constructor(parameters: ProvisionDelegationRequestParameters) {
    super("ProvisionDelegation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionDelegation`;

    const body = requestBody({
      delegatedauthorization: this.Parameters.delegatedauthorization,
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

  async parseResponse(response: Response): Promise<ProvisionDelegationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ProvisionDelegationResponse.fromResponse({});
    return ProvisionDelegationResponse.fromResponse(await response.json());
  }
}

/**
 * ProvisionDelegation response message
 */
export class ProvisionDelegationResponse extends OrganizationResponse {
  constructor(public result: team) {
    super("ProvisionDelegation");
  }

  static fromResponse(data: unknown): ProvisionDelegationResponse {
    return new ProvisionDelegationResponse(responseObject<team>(data));
  }
}
