import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from QueueUpdateRibbonClientMetadata action
 */
export interface QueueUpdateRibbonClientMetadataResponse {
  // No content returned
}

/**
 * QueueUpdateRibbonClientMetadata action
 *
 * Unbound action
 */
export class QueueUpdateRibbonClientMetadataAction implements Executable<QueueUpdateRibbonClientMetadataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueueUpdateRibbonClientMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<QueueUpdateRibbonClientMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as QueueUpdateRibbonClientMetadataResponse;
    return (await response.json()) as QueueUpdateRibbonClientMetadataResponse;
  }
}
