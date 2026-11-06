import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PvaComponentCollectionAuthorize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaComponentCollectionAuthorizeRequestParameters {
  Users: Record<string, unknown>[];
  SharingRoleType: number;
  ShareOrUnshare: boolean;
}

/**
 * PvaComponentCollectionAuthorize request message
 *
 * Web API Action: PvaComponentCollectionAuthorize
 *
 * The first argument is the id of the botcomponentcollection record to call it on.
 */
export class PvaComponentCollectionAuthorizeRequest
  extends OrganizationRequest
  implements Executable<PvaComponentCollectionAuthorizeResponse>
{
  declare readonly Parameters: Readonly<PvaComponentCollectionAuthorizeRequestParameters>;

  constructor(
    public botcomponentcollectionId: string,
    parameters: PvaComponentCollectionAuthorizeRequestParameters
  ) {
    super("PvaComponentCollectionAuthorize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/botcomponentcollections(${this.botcomponentcollectionId})/Microsoft.Dynamics.CRM.PvaComponentCollectionAuthorize`;

    const body = requestBody({
      Users: this.Parameters.Users,
      SharingRoleType: this.Parameters.SharingRoleType,
      ShareOrUnshare: this.Parameters.ShareOrUnshare,
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

  parseResponse(_response: Response): Promise<PvaComponentCollectionAuthorizeResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new PvaComponentCollectionAuthorizeResponse());
  }
}

/**
 * PvaComponentCollectionAuthorize response message
 */
export class PvaComponentCollectionAuthorizeResponse extends OrganizationResponse {
  constructor() {
    super("PvaComponentCollectionAuthorize");
  }

  static fromResponse(_data?: unknown): PvaComponentCollectionAuthorizeResponse {
    return new PvaComponentCollectionAuthorizeResponse();
  }
}
