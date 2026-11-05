import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GDPROptoutUser request message
 *
 * Web API Action: msdyn_GDPROptoutUser
 */
export class msdyn_GDPROptoutUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_GDPROptoutUserResponse>
{
  constructor(
    public systemuserId: string,
    public optout: boolean
  ) {
    super("msdyn_GDPROptoutUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutUser`;

    const body: Record<string, unknown> = {
      optout: this.optout,
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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutUserResponse> {
    // No return value (204 No Content)
    return new msdyn_GDPROptoutUserResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.systemuserId,
      optout: this.optout,
    };
  }
}

/**
 * msdyn_GDPROptoutUser response message
 */
export class msdyn_GDPROptoutUserResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GDPROptoutUser");
  }

  static fromResponse(_data: unknown): msdyn_GDPROptoutUserResponse {
    return new msdyn_GDPROptoutUserResponse();
  }
}
