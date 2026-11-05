import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaComponentCollectionAuthorize request message
 *
 * Web API Action: PvaComponentCollectionAuthorize
 */
export class PvaComponentCollectionAuthorizeRequest
  extends OrganizationRequest
  implements Executable<PvaComponentCollectionAuthorizeResponse>
{
  constructor(
    public botcomponentcollectionId: string,
    public users: Record<string, unknown>[],
    public sharingRoleType: number,
    public shareOrUnshare: boolean
  ) {
    super("PvaComponentCollectionAuthorize");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/botcomponentcollections(${this.botcomponentcollectionId})/Microsoft.Dynamics.CRM.PvaComponentCollectionAuthorize`;

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

  async parseResponse(response: Response): Promise<PvaComponentCollectionAuthorizeResponse> {
    // No return value (204 No Content)
    return new PvaComponentCollectionAuthorizeResponse();
  }
}

/**
 * PvaComponentCollectionAuthorize response message
 */
export class PvaComponentCollectionAuthorizeResponse extends OrganizationResponse {
  constructor() {
    super("PvaComponentCollectionAuthorize");
  }

  static fromResponse(_data: unknown): PvaComponentCollectionAuthorizeResponse {
    return new PvaComponentCollectionAuthorizeResponse();
  }
}
