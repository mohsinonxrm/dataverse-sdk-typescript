import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { asyncoperation } from "./types/index.js";

/**
 * ParseImport request message
 *
 * Web API Action: ParseImport
 *
 * The first argument is the id of the import record to call it on.
 */
export class ParseImportRequest
  extends OrganizationRequest
  implements Executable<ParseImportResponse>
{
  constructor(public importId: string) {
    super("ParseImport");
  }

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
    // 204 No Content is an empty result
    if (response.status === 204) return ParseImportResponse.fromResponse({});
    return ParseImportResponse.fromResponse(await response.json());
  }
}

/**
 * ParseImport response message
 */
export class ParseImportResponse extends OrganizationResponse {
  constructor(public result: asyncoperation) {
    super("ParseImport");
  }

  static fromResponse(data: unknown): ParseImportResponse {
    return new ParseImportResponse(responseObject<asyncoperation>(data));
  }
}
