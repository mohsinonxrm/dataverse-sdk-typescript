import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRITenantEndpoint action
 */
export interface msdyn_GetRITenantEndpointResponse {
  TenantInfo: string;
}

/**
 * msdyn_GetRITenantEndpoint action
 *
 * Unbound action
 */
export class msdyn_GetRITenantEndpointAction implements Executable<msdyn_GetRITenantEndpointResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRITenantEndpoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRITenantEndpointResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetRITenantEndpointResponse;
  }
}
