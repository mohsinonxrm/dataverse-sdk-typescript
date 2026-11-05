import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaAuthorize request message
 *
 * Web API Action: PvaAuthorize
 */
export class PvaAuthorizeRequest
  extends OrganizationRequest
  implements Executable<PvaAuthorizeResponse>
{
  constructor(
    public botId: string,
    public users: Record<string, unknown>[],
    public sharingRoleType: number,
    public shareOrUnshare: boolean
  ) {
    super("PvaAuthorize");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaAuthorize`;

    const body: Record<string, unknown> = {
      Users: this.users,
      SharingRoleType: this.sharingRoleType,
      ShareOrUnshare: this.shareOrUnshare,
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

  async parseResponse(response: Response): Promise<PvaAuthorizeResponse> {
    // No return value (204 No Content)
    return new PvaAuthorizeResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.botId,
      Users: this.users,
      SharingRoleType: this.sharingRoleType,
      ShareOrUnshare: this.shareOrUnshare,
    };
  }
}

/**
 * PvaAuthorize response message
 */
export class PvaAuthorizeResponse extends OrganizationResponse {
  constructor() {
    super("PvaAuthorize");
  }

  static fromResponse(_data: unknown): PvaAuthorizeResponse {
    return new PvaAuthorizeResponse();
  }
}
