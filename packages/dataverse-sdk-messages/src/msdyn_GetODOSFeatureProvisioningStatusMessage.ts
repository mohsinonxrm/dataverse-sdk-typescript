import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetODOSFeatureProvisioningStatusResponse as msdyn_GetODOSFeatureProvisioningStatusResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureProvisioningStatusResponse> {
    const data = await response.json();
    return msdyn_GetODOSFeatureProvisioningStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetODOSFeatureProvisioningStatus response message
 */
export class msdyn_GetODOSFeatureProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSFeatureProvisioningStatusResponseData) {
    super("msdyn_GetODOSFeatureProvisioningStatus");
  }

  static fromResponse(data: unknown): msdyn_GetODOSFeatureProvisioningStatusResponse {
    return new msdyn_GetODOSFeatureProvisioningStatusResponse(
      responseObject<msdyn_GetODOSFeatureProvisioningStatusResponseData>(data)
    );
  }
}
