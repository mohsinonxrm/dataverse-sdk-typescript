import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { PagingInfo } from "./types/index.js";

/**
 * Parameters of the RetrieveDuplicates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDuplicatesRequestParameters {
  BusinessEntity: EntityReference;
  MatchingEntityName: string;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveDuplicates request message
 *
 * Web API Function: RetrieveDuplicates
 */
export class RetrieveDuplicatesRequest
  extends OrganizationRequest
  implements Executable<RetrieveDuplicatesResponse>
{
  declare readonly Parameters: Readonly<RetrieveDuplicatesRequestParameters>;

  constructor(parameters: RetrieveDuplicatesRequestParameters) {
    super("RetrieveDuplicates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDuplicates`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.BusinessEntity !== undefined) {
      aliases.push(`BusinessEntity=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.BusinessEntity, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.MatchingEntityName !== undefined) {
      aliases.push(`MatchingEntityName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.MatchingEntityName, "Edm.String"));
    }
    if (this.Parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p3`);
      params.append(
        "@p3",
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

  async parseResponse(response: Response): Promise<RetrieveDuplicatesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveDuplicatesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveDuplicatesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDuplicates function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDuplicatesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveDuplicates response message
 *
 * `result` is the value the RetrieveDuplicates function returns (see {@link RetrieveDuplicatesResult}).
 */
export class RetrieveDuplicatesResponse extends OrganizationResponse {
  constructor(public result: RetrieveDuplicatesResult) {
    super("RetrieveDuplicates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDuplicatesResponse {
    return new RetrieveDuplicatesResponse(
      data === undefined ? [] : (data as { value: RetrieveDuplicatesResult }).value
    );
  }
}
