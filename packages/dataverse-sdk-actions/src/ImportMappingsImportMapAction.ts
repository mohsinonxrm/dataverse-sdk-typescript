import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { importmap } from "./types/index.js";

/**
 * Response from ImportMappingsImportMap action
 */
export interface ImportMappingsImportMapResponse {
  value: importmap;
}

/**
 * ImportMappingsImportMap action
 *
 * Unbound action
 */
export class ImportMappingsImportMapAction implements Executable<ImportMappingsImportMapResponse> {
  constructor(
    public readonly mappingsXml: string,
    public readonly replaceIds: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportMappingsImportMap`;

    const body: Record<string, unknown> = {
      MappingsXml: this.mappingsXml,
      ReplaceIds: this.replaceIds,
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

  async parseResponse(response: Response): Promise<ImportMappingsImportMapResponse> {
    const data = await response.json();
    return data as ImportMappingsImportMapResponse;
  }
}
