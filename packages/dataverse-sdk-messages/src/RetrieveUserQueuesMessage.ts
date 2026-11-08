import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { queue } from "./types/index.js";

/**
 * Parameters of the RetrieveUserQueues message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserQueuesRequestParameters {
  IncludePublic: boolean;
}

/**
 * RetrieveUserQueues request message
 *
 * Web API Function: RetrieveUserQueues
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserQueuesRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserQueuesResponse>
{
  declare readonly Parameters: Readonly<RetrieveUserQueuesRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUserQueuesRequestParameters
  ) {
    super("RetrieveUserQueues", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserQueues`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.IncludePublic !== undefined) {
      aliases.push(`IncludePublic=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.IncludePublic, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveUserQueuesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveUserQueuesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveUserQueuesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserQueues function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveUserQueuesResult = Array<
  queue & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveUserQueues response message
 *
 * `result` is the value the RetrieveUserQueues function returns (see {@link RetrieveUserQueuesResult}).
 */
export class RetrieveUserQueuesResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserQueuesResult) {
    super("RetrieveUserQueues");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserQueuesResponse {
    return new RetrieveUserQueuesResponse(
      data === undefined ? [] : (data as { value: RetrieveUserQueuesResult }).value
    );
  }
}
