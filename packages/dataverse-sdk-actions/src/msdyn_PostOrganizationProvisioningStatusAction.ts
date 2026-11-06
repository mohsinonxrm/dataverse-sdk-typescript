import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PostOrganizationProvisioningStatus action
 */
export interface msdyn_PostOrganizationProvisioningStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_PostOrganizationProvisioningStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PostOrganizationProvisioningStatusActionParameters {
  autoCaptureSettings: string;
  autoCaptureRules: string;
  orgProvisioningDetails: string;
}

/**
 * msdyn_PostOrganizationProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_PostOrganizationProvisioningStatusAction implements Executable<msdyn_PostOrganizationProvisioningStatusResponse> {
  constructor(
    public readonly parameters: msdyn_PostOrganizationProvisioningStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostOrganizationProvisioningStatus`;

    const body = requestBody({
      autoCaptureSettings: this.parameters.autoCaptureSettings,
      autoCaptureRules: this.parameters.autoCaptureRules,
      orgProvisioningDetails: this.parameters.orgProvisioningDetails,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_PostOrganizationProvisioningStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PostOrganizationProvisioningStatusResponse;
  }
}
