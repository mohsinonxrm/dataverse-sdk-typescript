import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GDPROptoutUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutUserRequestParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutUser request message
 *
 * Web API Action: msdyn_GDPROptoutUser
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class msdyn_GDPROptoutUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_GDPROptoutUserResponse>
{
  declare readonly Parameters: Readonly<msdyn_GDPROptoutUserRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: msdyn_GDPROptoutUserRequestParameters
  ) {
    super("msdyn_GDPROptoutUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutUser`;

    const body = requestBody({
      optout: this.Parameters.optout,
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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutUserResponse> {
    // No return value (204 No Content)
    return new msdyn_GDPROptoutUserResponse();
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
