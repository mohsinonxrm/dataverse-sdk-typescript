import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { importmap } from "./types/index.js";

/**
 * Response from the ImportMappingsImportMap action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ImportMappingsImportMapResponse =
  | (importmap & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * Parameters of the ImportMappingsImportMap action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportMappingsImportMapActionParameters {
  MappingsXml: string;
  ReplaceIds: boolean;
}

/**
 * ImportMappingsImportMap action
 *
 * Unbound action
 */
export class ImportMappingsImportMapAction implements Executable<ImportMappingsImportMapResponse> {
  constructor(public readonly parameters: ImportMappingsImportMapActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportMappingsImportMap`;

    const body = requestBody({
      MappingsXml: this.parameters.MappingsXml,
      ReplaceIds: this.parameters.ReplaceIds,
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

  async parseResponse(response: Response): Promise<ImportMappingsImportMapResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ImportMappingsImportMapResponse;
  }
}
