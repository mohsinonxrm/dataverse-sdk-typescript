import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateRibbonClientMetadata action
 */
export interface UpdateRibbonClientMetadataResponse {
  // No content returned
}

/**
 * UpdateRibbonClientMetadata action
 *
 * Unbound action
 */
export class UpdateRibbonClientMetadataAction implements Executable<UpdateRibbonClientMetadataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateRibbonClientMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<UpdateRibbonClientMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UpdateRibbonClientMetadataResponse;
    return (await response.json()) as UpdateRibbonClientMetadataResponse;
  }
}
