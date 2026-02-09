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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetODOSMetadataResponse> {
    const data = await response.json();
    return data as msdyn_GetODOSMetadataResponse;
  }
}
