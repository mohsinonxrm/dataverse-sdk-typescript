import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetDistinctValuesImportFile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetDistinctValuesImportFileRequestParameters {
  columnNumber: number;
  pageNumber: number;
  recordsPerPage: number;
}

/**
 * GetDistinctValuesImportFile request message
 *
 * Web API Function: GetDistinctValuesImportFile
 *
 * The first argument is the id of the importfile record to call it on.
 */
export class GetDistinctValuesImportFileRequest
  extends OrganizationRequest
  implements Executable<GetDistinctValuesImportFileResponse>
{
  declare readonly Parameters: Readonly<GetDistinctValuesImportFileRequestParameters>;

  constructor(
    public importfileId: string,
    parameters: GetDistinctValuesImportFileRequestParameters
  ) {
    super("GetDistinctValuesImportFile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/importfiles(${odataLiteral.guid(this.importfileId)})/Microsoft.Dynamics.CRM.GetDistinctValuesImportFile`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.columnNumber !== undefined) {
      aliases.push(`columnNumber=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.columnNumber, "Edm.Int32"));
    }
    if (this.Parameters.pageNumber !== undefined) {
      aliases.push(`pageNumber=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.pageNumber, "Edm.Int32"));
    }
    if (this.Parameters.recordsPerPage !== undefined) {
      aliases.push(`recordsPerPage=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.recordsPerPage, "Edm.Int32"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetDistinctValuesImportFileResponse> {
    // The body is the complex value, with its @odata.context
    return GetDistinctValuesImportFileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetDistinctValuesImportFile function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetDistinctValuesImportFileResult {
  "@odata.context"?: string;
  Values: string[];
}

/**
 * GetDistinctValuesImportFile response message
 *
 * `result` is the value the GetDistinctValuesImportFile function returns (see {@link GetDistinctValuesImportFileResult}).
 */
export class GetDistinctValuesImportFileResponse extends OrganizationResponse {
  constructor(public result: GetDistinctValuesImportFileResult) {
    super("GetDistinctValuesImportFile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetDistinctValuesImportFileResponse {
    return new GetDistinctValuesImportFileResponse(data as GetDistinctValuesImportFileResult);
  }
}
