import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * ParseImport request message
 *
 * Web API Action: ParseImport
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
    const data = await response.json();
    return ParseImportResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.importId,
    };
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
    return new ParseImportResponse((data as any).value);
  }
}
