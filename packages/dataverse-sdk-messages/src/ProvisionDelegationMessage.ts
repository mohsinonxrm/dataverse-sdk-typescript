import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
  constructor(public delegatedauthorization: delegatedauthorization) {
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

  toRequestBody(): Record<string, unknown> {
    return {
      delegatedauthorization: this.delegatedauthorization,
    };
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
    return new ProvisionDelegationResponse((data as any).value);
  }
}
