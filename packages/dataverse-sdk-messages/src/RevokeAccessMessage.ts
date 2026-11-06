import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * RevokeAccess request message
 *
 * Web API Action: RevokeAccess
 */
export class RevokeAccessRequest
  extends OrganizationRequest
  implements Executable<RevokeAccessResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public revokee: EntityReference | AnyEntityPayload
  ) {
    super("RevokeAccess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeAccess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Revokee: this.revokee,
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

  async parseResponse(response: Response): Promise<RevokeAccessResponse> {
    // No return value (204 No Content)
    return new RevokeAccessResponse();
  }
}

/**
 * RevokeAccess response message
 */
export class RevokeAccessResponse extends OrganizationResponse {
  constructor() {
    super("RevokeAccess");
  }

  static fromResponse(_data: unknown): RevokeAccessResponse {
    return new RevokeAccessResponse();
  }
}
