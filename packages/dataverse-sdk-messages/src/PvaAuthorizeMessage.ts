import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PvaAuthorize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaAuthorizeRequestParameters {
  Users: Record<string, unknown>[];
  SharingRoleType: number;
  ShareOrUnshare: boolean;
}

/**
 * PvaAuthorize request message
 *
 * Web API Action: PvaAuthorize
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaAuthorizeRequest
  extends OrganizationRequest
  implements Executable<PvaAuthorizeResponse>
{
  declare readonly Parameters: Readonly<PvaAuthorizeRequestParameters>;

  constructor(
    public botId: string,
    parameters: PvaAuthorizeRequestParameters
  ) {
    super("PvaAuthorize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaAuthorize`;

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

  async parseResponse(response: Response): Promise<PvaAuthorizeResponse> {
    // No return value (204 No Content)
    return new PvaAuthorizeResponse();
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
