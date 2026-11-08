import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveCompositeDataSource message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCompositeDataSourceRequestParameters {
  ParentSchemaName: string;
  ChildSchemaName: string;
}

/**
 * RetrieveCompositeDataSource request message
 *
 * Web API Function: RetrieveCompositeDataSource
 */
export class RetrieveCompositeDataSourceRequest
  extends OrganizationRequest
  implements Executable<RetrieveCompositeDataSourceResponse>
{
  declare readonly Parameters: Readonly<RetrieveCompositeDataSourceRequestParameters>;

  constructor(parameters: RetrieveCompositeDataSourceRequestParameters) {
    super("RetrieveCompositeDataSource", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCompositeDataSource`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ParentSchemaName !== undefined) {
      aliases.push(`ParentSchemaName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ParentSchemaName, "Edm.String"));
    }
    if (this.Parameters.ChildSchemaName !== undefined) {
      aliases.push(`ChildSchemaName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ChildSchemaName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveCompositeDataSourceResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveCompositeDataSourceResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveCompositeDataSourceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveCompositeDataSource function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveCompositeDataSourceResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveCompositeDataSource response message
 *
 * `result` is the value the RetrieveCompositeDataSource function returns (see {@link RetrieveCompositeDataSourceResult}).
 */
export class RetrieveCompositeDataSourceResponse extends OrganizationResponse {
  constructor(public result: RetrieveCompositeDataSourceResult) {
    super("RetrieveCompositeDataSource");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveCompositeDataSourceResponse {
    return new RetrieveCompositeDataSourceResponse(
      data === undefined ? [] : (data as { value: RetrieveCompositeDataSourceResult }).value
    );
  }
}
