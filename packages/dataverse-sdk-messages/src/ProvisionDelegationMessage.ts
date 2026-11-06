import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization, team } from "./types/index.js";

/**
 * ProvisionDelegation request message
 *
 * Web API Action: ProvisionDelegation
 */
export class ProvisionDelegationRequest
  extends OrganizationRequest
  implements Executable<ProvisionDelegationResponse>
{
  constructor(
    public delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>
  ) {
    super("ProvisionDelegation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionDelegation`;

    const body: Record<string, unknown> = {
      delegatedauthorization: this.delegatedauthorization,
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

  async parseResponse(response: Response): Promise<ProvisionDelegationResponse> {
    const data = await response.json();
    return ProvisionDelegationResponse.fromResponse(data);
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
