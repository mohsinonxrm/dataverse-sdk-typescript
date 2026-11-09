import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateODOSFeatureEnabledRoles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateODOSFeatureEnabledRolesRequestParameters {
  FeatureName: string;
  Roles: string;
}

/**
 * msdyn_UpdateODOSFeatureEnabledRoles request message
 *
 * Web API Action: msdyn_UpdateODOSFeatureEnabledRoles
 */
export class msdyn_UpdateODOSFeatureEnabledRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateODOSFeatureEnabledRolesResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateODOSFeatureEnabledRolesRequestParameters>;

  constructor(parameters: msdyn_UpdateODOSFeatureEnabledRolesRequestParameters) {
    super("msdyn_UpdateODOSFeatureEnabledRoles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateODOSFeatureEnabledRoles`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
      Roles: this.Parameters.Roles,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateODOSFeatureEnabledRolesResponse());
  }
}

/**
 * msdyn_UpdateODOSFeatureEnabledRoles response message
 */
export class msdyn_UpdateODOSFeatureEnabledRolesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateODOSFeatureEnabledRoles");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateODOSFeatureEnabledRolesResponse {
    return new msdyn_UpdateODOSFeatureEnabledRolesResponse();
  }
}
