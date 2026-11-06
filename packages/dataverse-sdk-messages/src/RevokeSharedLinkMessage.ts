import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { AccessRights } from "./types/index.js";

/**
 * Parameters of the RevokeSharedLink message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RevokeSharedLinkRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  SharedRights: AccessRights;
}

/**
 * RevokeSharedLink request message
 *
 * Web API Action: RevokeSharedLink
 */
export class RevokeSharedLinkRequest
  extends OrganizationRequest
  implements Executable<RevokeSharedLinkResponse>
{
  declare readonly Parameters: Readonly<RevokeSharedLinkRequestParameters>;

  constructor(parameters: RevokeSharedLinkRequestParameters) {
    super("RevokeSharedLink", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeSharedLink`;

    const body = requestBody({
      Target: this.Parameters.Target,
      SharedRights: enumBody(this.Parameters.SharedRights, "AccessRights"),
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
