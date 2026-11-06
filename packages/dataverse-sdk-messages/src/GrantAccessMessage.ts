import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * GrantAccess request message
 *
 * Web API Action: GrantAccess
 */
export class GrantAccessRequest
  extends OrganizationRequest
  implements Executable<GrantAccessResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public principalAccess?: PrincipalAccess
  ) {
    super("GrantAccess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      PrincipalAccess: this.principalAccess,
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

  async parseResponse(response: Response): Promise<GrantAccessResponse> {
    // No return value (204 No Content)
    return new GrantAccessResponse();
  }
}

/**
 * GrantAccess response message
 */
export class GrantAccessResponse extends OrganizationResponse {
  constructor() {
    super("GrantAccess");
  }

  static fromResponse(_data: unknown): GrantAccessResponse {
    return new GrantAccessResponse();
  }
}
