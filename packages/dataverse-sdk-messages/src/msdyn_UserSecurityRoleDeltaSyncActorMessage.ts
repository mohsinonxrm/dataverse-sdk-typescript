import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UserSecurityRoleDeltaSyncActor message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UserSecurityRoleDeltaSyncActorRequestParameters {
  InputData: string;
}

/**
 * msdyn_UserSecurityRoleDeltaSyncActor request message
 *
 * Web API Action: msdyn_UserSecurityRoleDeltaSyncActor
 */
export class msdyn_UserSecurityRoleDeltaSyncActorRequest
  extends OrganizationRequest
  implements Executable<msdyn_UserSecurityRoleDeltaSyncActorResponse>
{
  declare readonly Parameters: Readonly<msdyn_UserSecurityRoleDeltaSyncActorRequestParameters>;

  constructor(parameters: msdyn_UserSecurityRoleDeltaSyncActorRequestParameters) {
    super("msdyn_UserSecurityRoleDeltaSyncActor", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserSecurityRoleDeltaSyncActor`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_UserSecurityRoleDeltaSyncActorResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UserSecurityRoleDeltaSyncActorResponse());
  }
}

/**
 * msdyn_UserSecurityRoleDeltaSyncActor response message
 */
export class msdyn_UserSecurityRoleDeltaSyncActorResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UserSecurityRoleDeltaSyncActor");
  }

  static fromResponse(_data?: unknown): msdyn_UserSecurityRoleDeltaSyncActorResponse {
    return new msdyn_UserSecurityRoleDeltaSyncActorResponse();
  }
}
