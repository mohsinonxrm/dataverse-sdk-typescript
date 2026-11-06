import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from ParseImport action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ParseImportResponse extends asyncoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * ParseImport action
 *
 * Bound action
 * Binding parameter: entity (mscrm.import)
 *
 * The first argument is the id of the import record to call it on.
 */
export class ParseImportAction implements Executable<ParseImportResponse> {
  constructor(public readonly importId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/imports(${this.importId})/Microsoft.Dynamics.CRM.ParseImport`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ParseImportResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ParseImportResponse;
  }
}
