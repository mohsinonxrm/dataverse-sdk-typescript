import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
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
    const url = `${baseUrl}/imports(${odataLiteral.guid(this.importId)})/Microsoft.Dynamics.CRM.ParseImport`;

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
    if (response.status === 204) return ParseImportResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ParseImportResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ParseImport action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ParseImportResult =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * ParseImport response message
 *
 * `result` is the value the ParseImport action returns (see {@link ParseImportResult}).
 */
export class ParseImportResponse extends OrganizationResponse {
  constructor(public result: ParseImportResult) {
    super("ParseImport");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ParseImportResponse {
    return new ParseImportResponse((data ?? null) as ParseImportResult);
  }
}
