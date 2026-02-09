import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from ParseImport action
 */
export interface ParseImportResponse {
  value: asyncoperation;
}

/**
 * ParseImport action
 *
 * Bound action
 * Binding parameter: entity (mscrm.import)
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ParseImportResponse> {
    const data = await response.json();
    return data as ParseImportResponse;
  }
}
