import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { dependency } from "./types/index.js";

/**
 * Parameters of the RetrieveDependentComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDependentComponentsRequestParameters {
  ObjectId: string;
  ComponentType: number;
}

/**
 * RetrieveDependentComponents request message
 *
 * Web API Function: RetrieveDependentComponents
 */
export class RetrieveDependentComponentsRequest
  extends OrganizationRequest
  implements Executable<RetrieveDependentComponentsResponse>
{
  declare readonly Parameters: Readonly<RetrieveDependentComponentsRequestParameters>;

  constructor(parameters: RetrieveDependentComponentsRequestParameters) {
    super("RetrieveDependentComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependentComponents`;

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

  async parseResponse(response: Response): Promise<RetrieveDependentComponentsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveDependentComponentsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveDependentComponentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDependentComponents function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDependentComponentsResult = Array<
  dependency & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveDependentComponents response message
 *
 * `result` is the value the RetrieveDependentComponents function returns (see {@link RetrieveDependentComponentsResult}).
 */
export class RetrieveDependentComponentsResponse extends OrganizationResponse {
  constructor(public result: RetrieveDependentComponentsResult) {
    super("RetrieveDependentComponents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDependentComponentsResponse {
    return new RetrieveDependentComponentsResponse(
      data === undefined ? [] : (data as { value: RetrieveDependentComponentsResult }).value
    );
  }
}
