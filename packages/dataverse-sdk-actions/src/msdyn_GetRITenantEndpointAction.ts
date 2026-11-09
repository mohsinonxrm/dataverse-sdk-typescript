import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetRITenantEndpoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRITenantEndpointResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetRITenantEndpointResponse;
  }
}
