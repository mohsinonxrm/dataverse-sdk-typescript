import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetODOSFeatureEnabledRolesResponse as msdyn_GetODOSFeatureEnabledRolesResponseData } from "./types/index.js";

/**
 * msdyn_GetODOSFeatureEnabledRoles request message
 *
 * Web API Action: msdyn_GetODOSFeatureEnabledRoles
 */
export class msdyn_GetODOSFeatureEnabledRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSFeatureEnabledRolesResponse>
{
  constructor(public featureName: string) {
    super("msdyn_GetODOSFeatureEnabledRoles");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureEnabledRoles`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureEnabledRolesResponse> {
    const data = await response.json();
    return msdyn_GetODOSFeatureEnabledRolesResponse.fromResponse(data);
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
