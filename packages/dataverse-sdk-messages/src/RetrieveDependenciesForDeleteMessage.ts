import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { dependency } from "./types/index.js";

/**
 * Parameters of the RetrieveDependenciesForDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDependenciesForDeleteRequestParameters {
  ObjectId: string;
  ComponentType: number;
}

/**
 * RetrieveDependenciesForDelete request message
 *
 * Web API Function: RetrieveDependenciesForDelete
 */
export class RetrieveDependenciesForDeleteRequest
  extends OrganizationRequest
  implements Executable<RetrieveDependenciesForDeleteResponse>
{
  declare readonly Parameters: Readonly<RetrieveDependenciesForDeleteRequestParameters>;

  constructor(parameters: RetrieveDependenciesForDeleteRequestParameters) {
    super("RetrieveDependenciesForDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependenciesForDelete`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ObjectId, "Edm.Guid"));
    }
    if (this.Parameters.ComponentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ComponentType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveDependenciesForDeleteResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveDependenciesForDeleteResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveDependenciesForDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDependenciesForDelete function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDependenciesForDeleteResult = Array<
  dependency & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveDependenciesForDelete response message
 *
 * `result` is the value the RetrieveDependenciesForDelete function returns (see {@link RetrieveDependenciesForDeleteResult}).
 */
export class RetrieveDependenciesForDeleteResponse extends OrganizationResponse {
  constructor(public result: RetrieveDependenciesForDeleteResult) {
    super("RetrieveDependenciesForDelete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDependenciesForDeleteResponse {
    return new RetrieveDependenciesForDeleteResponse(
      data === undefined ? [] : (data as { value: RetrieveDependenciesForDeleteResult }).value
    );
  }
}
