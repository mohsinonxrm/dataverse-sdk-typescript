import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetODOSFeatureProvisioningStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetODOSFeatureProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetODOSFeatureProvisioningStatusResult {
  "@odata.context"?: string;
  Status: string;
}

/**
 * msdyn_GetODOSFeatureProvisioningStatus response message
 *
 * `result` is the value the msdyn_GetODOSFeatureProvisioningStatus action returns (see {@link msdyn_GetODOSFeatureProvisioningStatusResult}).
 */
export class msdyn_GetODOSFeatureProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSFeatureProvisioningStatusResult) {
    super("msdyn_GetODOSFeatureProvisioningStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetODOSFeatureProvisioningStatusResponse {
    return new msdyn_GetODOSFeatureProvisioningStatusResponse(
      data as msdyn_GetODOSFeatureProvisioningStatusResult
    );
  }
}
