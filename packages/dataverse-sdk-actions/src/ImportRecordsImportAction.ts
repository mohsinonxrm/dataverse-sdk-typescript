import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from ImportRecordsImport action
 */
export interface ImportRecordsImportResponse {
  value: asyncoperation;
}

/**
 * ImportRecordsImport action
 *
 * Bound action
 * Binding parameter: entity (mscrm.import)
 */
export class ImportRecordsImportAction implements Executable<ImportRecordsImportResponse> {
  constructor(public readonly importId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/imports(${this.importId})/Microsoft.Dynamics.CRM.ImportRecordsImport`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ImportRecordsImportResponse> {
    const data = await response.json();
    return data as ImportRecordsImportResponse;
  }
}
