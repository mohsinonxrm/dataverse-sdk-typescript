import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetODOSFeatureProvisioningStatusResponse as msdyn_GetODOSFeatureProvisioningStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetODOSFeatureProvisioningStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetODOSFeatureProvisioningStatusRequestParameters {
  FeatureName: string;
}

/**
 * msdyn_GetODOSFeatureProvisioningStatus request message
 *
 * Web API Action: msdyn_GetODOSFeatureProvisioningStatus
 */
export class msdyn_GetODOSFeatureProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSFeatureProvisioningStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetODOSFeatureProvisioningStatusRequestParameters>;

  constructor(parameters: msdyn_GetODOSFeatureProvisioningStatusRequestParameters) {
    super("msdyn_GetODOSFeatureProvisioningStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureProvisioningStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureProvisioningStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetODOSFeatureProvisioningStatusResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
