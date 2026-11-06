import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetQEAFabricConfiguration action
 */
export interface msdyn_GetQEAFabricConfigurationResponse {
  Configuration: string;
}

/**
 * msdyn_GetQEAFabricConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetQEAFabricConfigurationAction implements Executable<msdyn_GetQEAFabricConfigurationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetQEAFabricConfiguration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetQEAFabricConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetQEAFabricConfigurationResponse;
    return (await response.json()) as msdyn_GetQEAFabricConfigurationResponse;
  }
}
