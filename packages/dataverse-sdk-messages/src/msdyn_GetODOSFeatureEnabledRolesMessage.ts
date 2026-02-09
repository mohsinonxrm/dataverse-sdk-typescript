import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureEnabledRolesResponse> {
    const data = await response.json();
    return msdyn_GetODOSFeatureEnabledRolesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FeatureName: this.featureName,
    };
  }
}

/**
 * msdyn_GetODOSFeatureEnabledRoles response message
 */
export class msdyn_GetODOSFeatureEnabledRolesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSFeatureEnabledRolesResponse) {
    super("msdyn_GetODOSFeatureEnabledRoles");
  }

  static fromResponse(data: unknown): msdyn_GetODOSFeatureEnabledRolesResponse {
    return new msdyn_GetODOSFeatureEnabledRolesResponse((data as any).value);
  }
}
