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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetODOSMetadataResponse;
  }
}
