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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetRITenantEndpointResponse;
    return (await response.json()) as msdyn_GetRITenantEndpointResponse;
  }
}
