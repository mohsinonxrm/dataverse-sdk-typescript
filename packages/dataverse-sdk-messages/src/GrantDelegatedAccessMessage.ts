import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { delegatedauthorization } from "./types/index.js";

/**
 * GrantDelegatedAccess request message
 *
 * Web API Action: GrantDelegatedAccess
 */
export class GrantDelegatedAccessRequest
  extends OrganizationRequest
  implements Executable<GrantDelegatedAccessResponse>
{
  constructor(
    public target: EntityReference,
    public delegatedauthorization: delegatedauthorization,
    public owneraccess: boolean
  ) {
    super("GrantDelegatedAccess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantDelegatedAccess`;

    const body: Record<string, unknown> = {
      target: this.target,
      delegatedauthorization: this.delegatedauthorization,
      owneraccess: this.owneraccess,
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

  async parseResponse(response: Response): Promise<GrantDelegatedAccessResponse> {
    // No return value (204 No Content)
    return new GrantDelegatedAccessResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      target: this.target,
      delegatedauthorization: this.delegatedauthorization,
      owneraccess: this.owneraccess,
    };
  }
}

/**
 * GrantDelegatedAccess response message
 */
export class GrantDelegatedAccessResponse extends OrganizationResponse {
  constructor() {
    super("GrantDelegatedAccess");
  }

  static fromResponse(_data: unknown): GrantDelegatedAccessResponse {
    return new GrantDelegatedAccessResponse();
  }
}
