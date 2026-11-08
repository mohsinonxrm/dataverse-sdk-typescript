import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetHeaderColumnsImportFile request message
 *
 * Web API Function: GetHeaderColumnsImportFile
 *
 * The first argument is the id of the importfile record to call it on.
 */
export class GetHeaderColumnsImportFileRequest
  extends OrganizationRequest
  implements Executable<GetHeaderColumnsImportFileResponse>
{
  constructor(public importfileId: string) {
    super("GetHeaderColumnsImportFile");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/importfiles(${odataLiteral.guid(this.importfileId)})/Microsoft.Dynamics.CRM.GetHeaderColumnsImportFile`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetHeaderColumnsImportFileResponse> {
    // The body is the complex value, with its @odata.context
    return GetHeaderColumnsImportFileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetHeaderColumnsImportFile function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetHeaderColumnsImportFileResult {
  "@odata.context"?: string;
  Columns: string[];
}

/**
 * GetHeaderColumnsImportFile response message
 *
 * `result` is the value the GetHeaderColumnsImportFile function returns (see {@link GetHeaderColumnsImportFileResult}).
 */
export class GetHeaderColumnsImportFileResponse extends OrganizationResponse {
  constructor(public result: GetHeaderColumnsImportFileResult) {
    super("GetHeaderColumnsImportFile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetHeaderColumnsImportFileResponse {
    return new GetHeaderColumnsImportFileResponse(data as GetHeaderColumnsImportFileResult);
  }
}
