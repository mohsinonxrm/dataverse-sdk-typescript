import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * ImportRecordsImport request message
 *
 * Web API Action: ImportRecordsImport
 *
 * The first argument is the id of the import record to call it on.
 */
export class ImportRecordsImportRequest
  extends OrganizationRequest
  implements Executable<ImportRecordsImportResponse>
{
  constructor(public importId: string) {
    super("ImportRecordsImport");
  }

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return ImportRecordsImportResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ImportRecordsImportResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImportRecordsImport action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ImportRecordsImportResult =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * ImportRecordsImport response message
 *
 * `result` is the value the ImportRecordsImport action returns (see {@link ImportRecordsImportResult}).
 */
export class ImportRecordsImportResponse extends OrganizationResponse {
  constructor(public result: ImportRecordsImportResult) {
    super("ImportRecordsImport");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImportRecordsImportResponse {
    return new ImportRecordsImportResponse((data ?? null) as ImportRecordsImportResult);
  }
}
