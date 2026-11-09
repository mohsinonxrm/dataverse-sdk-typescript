import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetODOSMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetODOSMetadataResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetODOSMetadataResponse;
  }
}
