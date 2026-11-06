import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetQEAFabricConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetQEAFabricConfigurationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetQEAFabricConfigurationResponse;
  }
}
