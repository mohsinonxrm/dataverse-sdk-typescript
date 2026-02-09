import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { annotation } from "./types/index.js";

/**
 * Response from adx_AzureBlobStorageUrl action
 */
export interface adx_AzureBlobStorageUrlResponse {
  Url: string;
}

/**
 * adx_AzureBlobStorageUrl action
 *
 * Unbound action
 */
export class adx_AzureBlobStorageUrlAction implements Executable<adx_AzureBlobStorageUrlResponse> {
  constructor(public readonly annotation: annotation) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageUrl`;

    const body: Record<string, unknown> = {
      Annotation: this.annotation,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<adx_AzureBlobStorageUrlResponse> {
    const data = await response.json();
    return data as adx_AzureBlobStorageUrlResponse;
  }
}
