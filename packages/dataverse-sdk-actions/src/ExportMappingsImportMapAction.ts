import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExportMappingsImportMap action
 */
export interface ExportMappingsImportMapResponse {
  MappingsXml: string;
}

/**
 * Parameters of the ExportMappingsImportMap action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportMappingsImportMapActionParameters {
  ExportIds?: boolean;
}

/**
 * ExportMappingsImportMap action
 *
 * Bound action
 * Binding parameter: entity (mscrm.importmap)
 *
 * The first argument is the id of the importmap record to call it on.
 */
export class ExportMappingsImportMapAction implements Executable<ExportMappingsImportMapResponse> {
  constructor(
    public readonly importmapId: string,
    public readonly parameters: ExportMappingsImportMapActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/importmaps(${this.importmapId})/Microsoft.Dynamics.CRM.ExportMappingsImportMap`;

    const body = requestBody({
      ExportIds: this.parameters.ExportIds,
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

  async parseResponse(response: Response): Promise<ExportMappingsImportMapResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExportMappingsImportMapResponse;
    return (await response.json()) as ExportMappingsImportMapResponse;
  }
}
