import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from the ParseImport action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ParseImportResponse =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ParseImportResponse;
  }
}
