import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { annotation } from "./types/index.js";

/**
 * Response from the adx_AzureBlobStorageUrl action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface adx_AzureBlobStorageUrlResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as adx_AzureBlobStorageUrlResponse;
  }
}
