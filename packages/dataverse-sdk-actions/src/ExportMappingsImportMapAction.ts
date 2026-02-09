import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExportMappingsImportMap action
 */
export interface ExportMappingsImportMapResponse {
  MappingsXml: string;
}

/**
 * ExportMappingsImportMap action
 *
 * Bound action
 * Binding parameter: entity (mscrm.importmap)
 */
export class ExportMappingsImportMapAction implements Executable<ExportMappingsImportMapResponse> {
  constructor(
    public readonly importmapId: string,
    public readonly exportIds: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/importmaps(${this.importmapId})/Microsoft.Dynamics.CRM.ExportMappingsImportMap`;

    const body: Record<string, unknown> = {
      ExportIds: this.exportIds,
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

  async parseResponse(response: Response): Promise<ExportMappingsImportMapResponse> {
    const data = await response.json();
    return data as ExportMappingsImportMapResponse;
  }
}
