import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetODOSFeatureProvisioningStatus request message
 *
 * Web API Action: msdyn_GetODOSFeatureProvisioningStatus
 */
export class msdyn_GetODOSFeatureProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSFeatureProvisioningStatusResponse>
{
  constructor(public featureName: string) {
    super("msdyn_GetODOSFeatureProvisioningStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureProvisioningStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureProvisioningStatusResponse> {
    const data = await response.json();
    return msdyn_GetODOSFeatureProvisioningStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FeatureName: this.featureName,
    };
  }
}

/**
 * msdyn_GetODOSFeatureProvisioningStatus response message
 */
export class msdyn_GetODOSFeatureProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSFeatureProvisioningStatusResponse) {
    super("msdyn_GetODOSFeatureProvisioningStatus");
  }

  static fromResponse(data: unknown): msdyn_GetODOSFeatureProvisioningStatusResponse {
    return new msdyn_GetODOSFeatureProvisioningStatusResponse((data as any).value);
  }
}
