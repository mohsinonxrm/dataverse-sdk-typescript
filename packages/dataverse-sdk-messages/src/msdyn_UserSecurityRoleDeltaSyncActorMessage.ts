import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UserSecurityRoleDeltaSyncActor request message
 *
 * Web API Action: msdyn_UserSecurityRoleDeltaSyncActor
 */
export class msdyn_UserSecurityRoleDeltaSyncActorRequest
  extends OrganizationRequest
  implements Executable<msdyn_UserSecurityRoleDeltaSyncActorResponse>
{
  constructor(public inputData: string) {
    super("msdyn_UserSecurityRoleDeltaSyncActor");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserSecurityRoleDeltaSyncActor`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_UserSecurityRoleDeltaSyncActorResponse> {
    // No return value (204 No Content)
    return new msdyn_UserSecurityRoleDeltaSyncActorResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_UserSecurityRoleDeltaSyncActor response message
 */
export class msdyn_UserSecurityRoleDeltaSyncActorResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UserSecurityRoleDeltaSyncActor");
  }

  static fromResponse(_data: unknown): msdyn_UserSecurityRoleDeltaSyncActorResponse {
    return new msdyn_UserSecurityRoleDeltaSyncActorResponse();
  }
}
