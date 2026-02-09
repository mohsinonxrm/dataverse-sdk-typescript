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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<UpdateRibbonClientMetadataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
