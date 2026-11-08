import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveAllCompositeDataSources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAllCompositeDataSourcesRequestParameters {
  ParentSchemaName: string;
}

/**
 * RetrieveAllCompositeDataSources request message
 *
 * Web API Function: RetrieveAllCompositeDataSources
 */
export class RetrieveAllCompositeDataSourcesRequest
  extends OrganizationRequest
  implements Executable<RetrieveAllCompositeDataSourcesResponse>
{
  declare readonly Parameters: Readonly<RetrieveAllCompositeDataSourcesRequestParameters>;

  constructor(parameters: RetrieveAllCompositeDataSourcesRequestParameters) {
    super("RetrieveAllCompositeDataSources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAllCompositeDataSources`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ParentSchemaName !== undefined) {
      aliases.push(`ParentSchemaName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ParentSchemaName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveAllCompositeDataSourcesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveAllCompositeDataSourcesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveAllCompositeDataSourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAllCompositeDataSources function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAllCompositeDataSourcesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveAllCompositeDataSources response message
 *
 * `result` is the value the RetrieveAllCompositeDataSources function returns (see {@link RetrieveAllCompositeDataSourcesResult}).
 */
export class RetrieveAllCompositeDataSourcesResponse extends OrganizationResponse {
  constructor(public result: RetrieveAllCompositeDataSourcesResult) {
    super("RetrieveAllCompositeDataSources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAllCompositeDataSourcesResponse {
    return new RetrieveAllCompositeDataSourcesResponse(
      data === undefined ? [] : (data as { value: RetrieveAllCompositeDataSourcesResult }).value
    );
  }
}
