import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckMobileUserSecurityRoleResponse as msdyn_CheckMobileUserSecurityRoleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckMobileUserSecurityRole message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckMobileUserSecurityRoleRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckMobileUserSecurityRole request message
 *
 * Web API Action: msdyn_CheckMobileUserSecurityRole
 */
export class msdyn_CheckMobileUserSecurityRoleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckMobileUserSecurityRoleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckMobileUserSecurityRoleRequestParameters>;

  constructor(parameters: msdyn_CheckMobileUserSecurityRoleRequestParameters) {
    super("msdyn_CheckMobileUserSecurityRole", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckMobileUserSecurityRole`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckMobileUserSecurityRoleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckMobileUserSecurityRoleResponse.fromResponse({});
    return msdyn_CheckMobileUserSecurityRoleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckMobileUserSecurityRole response message
 */
export class msdyn_CheckMobileUserSecurityRoleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckMobileUserSecurityRoleResponseData) {
    super("msdyn_CheckMobileUserSecurityRole");
  }

  static fromResponse(data: unknown): msdyn_CheckMobileUserSecurityRoleResponse {
    return new msdyn_CheckMobileUserSecurityRoleResponse(
      responseObject<msdyn_CheckMobileUserSecurityRoleResponseData>(data)
    );
  }
}
