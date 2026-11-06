import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetODOSFeatureEnabledRolesResponse as msdyn_GetODOSFeatureEnabledRolesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetODOSFeatureEnabledRoles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetODOSFeatureEnabledRolesRequestParameters {
  FeatureName: string;
}

/**
 * msdyn_GetODOSFeatureEnabledRoles request message
 *
 * Web API Action: msdyn_GetODOSFeatureEnabledRoles
 */
export class msdyn_GetODOSFeatureEnabledRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSFeatureEnabledRolesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetODOSFeatureEnabledRolesRequestParameters>;

  constructor(parameters: msdyn_GetODOSFeatureEnabledRolesRequestParameters) {
    super("msdyn_GetODOSFeatureEnabledRoles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureEnabledRoles`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureEnabledRolesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetODOSFeatureEnabledRolesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetODOSFeatureEnabledRoles response message
 */
export class msdyn_GetODOSFeatureEnabledRolesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSFeatureEnabledRolesResponseData) {
    super("msdyn_GetODOSFeatureEnabledRoles");
  }

  static fromResponse(data: unknown): msdyn_GetODOSFeatureEnabledRolesResponse {
    return new msdyn_GetODOSFeatureEnabledRolesResponse(
      responseObject<msdyn_GetODOSFeatureEnabledRolesResponseData>(data)
    );
  }
}
