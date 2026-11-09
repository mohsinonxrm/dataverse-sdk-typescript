import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from the TransformImport action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type TransformImportResponse =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as TransformImportResponse;
  }
}
