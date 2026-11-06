import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the adx_AzureBlobStorageEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface adx_AzureBlobStorageEnabledResponse {
  "@odata.context"?: string;
  Enabled: boolean;
}

/**
 * adx_AzureBlobStorageEnabled action
 *
 * Unbound action
 */
export class adx_AzureBlobStorageEnabledAction implements Executable<adx_AzureBlobStorageEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<adx_AzureBlobStorageEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as adx_AzureBlobStorageEnabledResponse;
  }
}
