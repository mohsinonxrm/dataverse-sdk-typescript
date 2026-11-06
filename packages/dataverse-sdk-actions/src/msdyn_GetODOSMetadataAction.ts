import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetODOSMetadata action
 */
export interface msdyn_GetODOSMetadataResponse {
  Metadata: string;
}

/**
 * msdyn_GetODOSMetadata action
 *
 * Unbound action
 */
export class msdyn_GetODOSMetadataAction implements Executable<msdyn_GetODOSMetadataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetODOSMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetODOSMetadataResponse;
    return (await response.json()) as msdyn_GetODOSMetadataResponse;
  }
}
