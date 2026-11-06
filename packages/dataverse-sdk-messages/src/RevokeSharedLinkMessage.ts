import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { AccessRights } from "./types/index.js";

/**
 * RevokeSharedLink request message
 *
 * Web API Action: RevokeSharedLink
 */
export class RevokeSharedLinkRequest
  extends OrganizationRequest
  implements Executable<RevokeSharedLinkResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public sharedRights: AccessRights
  ) {
    super("RevokeSharedLink");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeSharedLink`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SharedRights: enumBody(this.sharedRights, "AccessRights"),
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

  async parseResponse(response: Response): Promise<RevokeSharedLinkResponse> {
    // No return value (204 No Content)
    return new RevokeSharedLinkResponse();
  }
}

/**
 * RevokeSharedLink response message
 */
export class RevokeSharedLinkResponse extends OrganizationResponse {
  constructor() {
    super("RevokeSharedLink");
  }

  static fromResponse(_data: unknown): RevokeSharedLinkResponse {
    return new RevokeSharedLinkResponse();
  }
}
