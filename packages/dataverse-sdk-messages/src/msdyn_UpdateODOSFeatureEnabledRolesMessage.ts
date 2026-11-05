import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateODOSFeatureEnabledRoles request message
 *
 * Web API Action: msdyn_UpdateODOSFeatureEnabledRoles
 */
export class msdyn_UpdateODOSFeatureEnabledRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateODOSFeatureEnabledRolesResponse>
{
  constructor(
    public featureName: string,
    public roles: string
  ) {
    super("msdyn_UpdateODOSFeatureEnabledRoles");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateODOSFeatureEnabledRoles`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
      Roles: this.roles,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateODOSFeatureEnabledRolesResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateODOSFeatureEnabledRolesResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FeatureName: this.featureName,
      Roles: this.roles,
    };
  }
}

/**
 * msdyn_UpdateODOSFeatureEnabledRoles response message
 */
export class msdyn_UpdateODOSFeatureEnabledRolesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateODOSFeatureEnabledRoles");
  }

  static fromResponse(_data: unknown): msdyn_UpdateODOSFeatureEnabledRolesResponse {
    return new msdyn_UpdateODOSFeatureEnabledRolesResponse();
  }
}
