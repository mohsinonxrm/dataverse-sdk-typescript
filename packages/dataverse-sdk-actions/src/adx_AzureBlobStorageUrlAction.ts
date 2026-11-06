import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { annotation } from "./types/index.js";

/**
 * Response from adx_AzureBlobStorageUrl action
 */
export interface adx_AzureBlobStorageUrlResponse {
  Url: string;
}

/**
 * Parameters of the adx_AzureBlobStorageUrl action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_AzureBlobStorageUrlActionParameters {
  Annotation?: EntityReference | EntityPayload<annotation>;
}

/**
 * adx_AzureBlobStorageUrl action
 *
 * Unbound action
 */
export class adx_AzureBlobStorageUrlAction implements Executable<adx_AzureBlobStorageUrlResponse> {
  constructor(public readonly parameters: adx_AzureBlobStorageUrlActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageUrl`;

    const body = requestBody({
      Annotation: this.parameters.Annotation,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as adx_AzureBlobStorageUrlResponse;
    return (await response.json()) as adx_AzureBlobStorageUrlResponse;
  }
}
