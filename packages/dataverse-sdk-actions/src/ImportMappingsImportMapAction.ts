import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { importmap } from "./types/index.js";

/**
 * Response from ImportMappingsImportMap action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ImportMappingsImportMapResponse extends importmap {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportMappingsImportMapResponse;
    return (await response.json()) as ImportMappingsImportMapResponse;
  }
}
