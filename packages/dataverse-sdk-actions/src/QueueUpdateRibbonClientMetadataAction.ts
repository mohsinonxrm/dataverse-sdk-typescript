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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<QueueUpdateRibbonClientMetadataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
