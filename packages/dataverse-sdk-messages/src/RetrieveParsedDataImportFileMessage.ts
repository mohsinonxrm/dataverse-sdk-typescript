import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { PagingInfo, StringCollection } from "./types/index.js";

/**
 * Parameters of the RetrieveParsedDataImportFile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveParsedDataImportFileRequestParameters {
  ImportFileId: string;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveParsedDataImportFile request message
 *
 * Web API Function: RetrieveParsedDataImportFile
 */
export class RetrieveParsedDataImportFileRequest
  extends OrganizationRequest
  implements Executable<RetrieveParsedDataImportFileResponse>
{
  declare readonly Parameters: Readonly<RetrieveParsedDataImportFileRequestParameters>;

  constructor(parameters: RetrieveParsedDataImportFileRequestParameters) {
    super("RetrieveParsedDataImportFile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveParsedDataImportFile`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ImportFileId !== undefined) {
      aliases.push(`ImportFileId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ImportFileId, "Edm.Guid"));
    }
    if (this.Parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.PagingInfo, "mscrm.PagingInfo", "ComplexType")
      );
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

  async parseResponse(response: Response): Promise<RetrieveParsedDataImportFileResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveParsedDataImportFileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveParsedDataImportFile function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveParsedDataImportFileResult {
  "@odata.context"?: string;
  Values: StringCollection[];
}

/**
 * RetrieveParsedDataImportFile response message
 *
 * `result` is the value the RetrieveParsedDataImportFile function returns (see {@link RetrieveParsedDataImportFileResult}).
 */
export class RetrieveParsedDataImportFileResponse extends OrganizationResponse {
  constructor(public result: RetrieveParsedDataImportFileResult) {
    super("RetrieveParsedDataImportFile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveParsedDataImportFileResponse {
    return new RetrieveParsedDataImportFileResponse(data as RetrieveParsedDataImportFileResult);
  }
}
