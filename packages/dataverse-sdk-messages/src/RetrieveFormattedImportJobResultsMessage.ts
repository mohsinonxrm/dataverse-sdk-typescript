import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveFormattedImportJobResults message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFormattedImportJobResultsRequestParameters {
  ImportJobId: string;
}

/**
 * RetrieveFormattedImportJobResults request message
 *
 * Web API Function: RetrieveFormattedImportJobResults
 */
export class RetrieveFormattedImportJobResultsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFormattedImportJobResultsResponse>
{
  declare readonly Parameters: Readonly<RetrieveFormattedImportJobResultsRequestParameters>;

  constructor(parameters: RetrieveFormattedImportJobResultsRequestParameters) {
    super("RetrieveFormattedImportJobResults", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveFormattedImportJobResults`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ImportJobId !== undefined) {
      aliases.push(`ImportJobId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ImportJobId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveFormattedImportJobResultsResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveFormattedImportJobResultsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFormattedImportJobResults function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFormattedImportJobResultsResult {
  "@odata.context"?: string;
  FormattedResults: string;
}

/**
 * RetrieveFormattedImportJobResults response message
 *
 * `result` is the value the RetrieveFormattedImportJobResults function returns (see {@link RetrieveFormattedImportJobResultsResult}).
 */
export class RetrieveFormattedImportJobResultsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFormattedImportJobResultsResult) {
    super("RetrieveFormattedImportJobResults");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFormattedImportJobResultsResponse {
    return new RetrieveFormattedImportJobResultsResponse(
      data as RetrieveFormattedImportJobResultsResult
    );
  }
}
