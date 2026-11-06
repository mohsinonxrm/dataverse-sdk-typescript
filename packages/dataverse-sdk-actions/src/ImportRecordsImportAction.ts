import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from ImportRecordsImport action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ImportRecordsImportResponse extends asyncoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * ImportRecordsImport action
 *
 * Bound action
 * Binding parameter: entity (mscrm.import)
 *
 * The first argument is the id of the import record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ImportRecordsImportResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportRecordsImportResponse;
    return (await response.json()) as ImportRecordsImportResponse;
  }
}
