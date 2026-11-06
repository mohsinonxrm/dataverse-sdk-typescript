import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from adx_AzureBlobStorageEnabled action
 */
export interface adx_AzureBlobStorageEnabledResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as adx_AzureBlobStorageEnabledResponse;
  }
}
