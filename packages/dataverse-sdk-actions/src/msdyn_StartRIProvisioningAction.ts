import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_StartRIProvisioning action
 */
export interface msdyn_StartRIProvisioningResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_StartRIProvisioning action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartRIProvisioningActionParameters {
  HubName?: string;
  PrimaryKey?: string;
}

/**
 * msdyn_StartRIProvisioning action
 *
 * Unbound action
 */
export class msdyn_StartRIProvisioningAction implements Executable<msdyn_StartRIProvisioningResponse> {
  constructor(public readonly parameters: msdyn_StartRIProvisioningActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartRIProvisioning`;

    const body = requestBody({
      HubName: this.parameters.HubName,
      PrimaryKey: this.parameters.PrimaryKey,
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

  async parseResponse(response: Response): Promise<msdyn_StartRIProvisioningResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_StartRIProvisioningResponse;
  }
}
