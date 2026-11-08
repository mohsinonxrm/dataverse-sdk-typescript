import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { team } from "./types/index.js";

/**
 * Parameters of the RetrieveSharedLinks message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSharedLinksRequestParameters {
  Target: EntityReference;
}

/**
 * RetrieveSharedLinks request message
 *
 * Web API Function: RetrieveSharedLinks
 */
export class RetrieveSharedLinksRequest
  extends OrganizationRequest
  implements Executable<RetrieveSharedLinksResponse>
{
  declare readonly Parameters: Readonly<RetrieveSharedLinksRequestParameters>;

  constructor(parameters: RetrieveSharedLinksRequestParameters) {
    super("RetrieveSharedLinks", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedLinks`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
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

  async parseResponse(response: Response): Promise<RetrieveSharedLinksResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveSharedLinksResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveSharedLinksResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveSharedLinks function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveSharedLinksResult = Array<
  team & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveSharedLinks response message
 *
 * `result` is the value the RetrieveSharedLinks function returns (see {@link RetrieveSharedLinksResult}).
 */
export class RetrieveSharedLinksResponse extends OrganizationResponse {
  constructor(public result: RetrieveSharedLinksResult) {
    super("RetrieveSharedLinks");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveSharedLinksResponse {
    return new RetrieveSharedLinksResponse(
      data === undefined ? [] : (data as { value: RetrieveSharedLinksResult }).value
    );
  }
}
