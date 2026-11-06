import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
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
  constructor(public readonly annotation?: EntityReference | EntityPayload<annotation>) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageUrl`;

    const body: Record<string, unknown> = {
      Annotation: this.annotation,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<adx_AzureBlobStorageUrlResponse> {
    const data = await response.json();
    return data as adx_AzureBlobStorageUrlResponse;
  }
}
