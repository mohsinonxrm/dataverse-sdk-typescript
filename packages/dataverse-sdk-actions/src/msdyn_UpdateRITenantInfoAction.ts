import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateRITenantInfo action
 */
export interface msdyn_UpdateRITenantInfoResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateRITenantInfo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRITenantInfoActionParameters {
  HubName?: string;
  PrimaryKey?: string;
}

/**
 * msdyn_UpdateRITenantInfo action
 *
 * Unbound action
 */
export class msdyn_UpdateRITenantInfoAction implements Executable<msdyn_UpdateRITenantInfoResponse> {
  constructor(public readonly parameters: msdyn_UpdateRITenantInfoActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRITenantInfo`;

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

  async parseResponse(response: Response): Promise<msdyn_UpdateRITenantInfoResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateRITenantInfoResponse;
    return (await response.json()) as msdyn_UpdateRITenantInfoResponse;
  }
}
