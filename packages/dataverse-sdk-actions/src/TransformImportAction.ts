import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from TransformImport action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface TransformImportResponse extends asyncoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the TransformImport action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface TransformImportActionParameters {
  ImportId: string;
}

/**
 * TransformImport action
 *
 * Unbound action
 */
export class TransformImportAction implements Executable<TransformImportResponse> {
  constructor(public readonly parameters: TransformImportActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/TransformImport`;

    const body = requestBody({
      ImportId: this.parameters.ImportId,
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

  async parseResponse(response: Response): Promise<TransformImportResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as TransformImportResponse;
    return (await response.json()) as TransformImportResponse;
  }
}
