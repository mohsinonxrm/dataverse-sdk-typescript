import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ImportRecordsImportResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ImportRecordsImport response message
 */
export class ImportRecordsImportResponse extends OrganizationResponse {
  constructor(public result: asyncoperation) {
    super("ImportRecordsImport");
  }

  static fromResponse(data: unknown): ImportRecordsImportResponse {
    return new ImportRecordsImportResponse(responseObject<asyncoperation>(data));
  }
}
