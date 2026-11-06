import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckAnyUserIsIntegrationUserResponse as msdyn_CheckAnyUserIsIntegrationUserResponseData } from "./types/index.js";

/**
 * msdyn_CheckAnyUserIsIntegrationUser request message
 *
 * Web API Action: msdyn_CheckAnyUserIsIntegrationUser
 */
export class msdyn_CheckAnyUserIsIntegrationUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckAnyUserIsIntegrationUserResponse>
{
  constructor() {
    super("msdyn_CheckAnyUserIsIntegrationUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckAnyUserIsIntegrationUser`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckAnyUserIsIntegrationUserResponse> {
    const data = await response.json();
    return msdyn_CheckAnyUserIsIntegrationUserResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckAnyUserIsIntegrationUser response message
 */
export class msdyn_CheckAnyUserIsIntegrationUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckAnyUserIsIntegrationUserResponseData) {
    super("msdyn_CheckAnyUserIsIntegrationUser");
  }

  static fromResponse(data: unknown): msdyn_CheckAnyUserIsIntegrationUserResponse {
    return new msdyn_CheckAnyUserIsIntegrationUserResponse(
      responseObject<msdyn_CheckAnyUserIsIntegrationUserResponseData>(data)
    );
  }
}
