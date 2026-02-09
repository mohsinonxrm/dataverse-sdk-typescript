import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * ImportRecordsImport request message
 *
 * Web API Action: ImportRecordsImport
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ImportRecordsImportResponse> {
    const data = await response.json();
    return ImportRecordsImportResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.importId,
    };
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
    return new ImportRecordsImportResponse((data as any).value);
  }
}
