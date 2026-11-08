import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveRequiredComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveRequiredComponentsRequestParameters {
  ObjectId: string;
  ComponentType: number;
}

/**
 * RetrieveRequiredComponents request message
 *
 * Web API Function: RetrieveRequiredComponents
 */
export class RetrieveRequiredComponentsRequest
  extends OrganizationRequest
  implements Executable<RetrieveRequiredComponentsResponse>
{
  declare readonly Parameters: Readonly<RetrieveRequiredComponentsRequestParameters>;

  constructor(parameters: RetrieveRequiredComponentsRequestParameters) {
    super("RetrieveRequiredComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRequiredComponents`;

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

  async parseResponse(response: Response): Promise<RetrieveRequiredComponentsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveRequiredComponentsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveRequiredComponentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveRequiredComponents function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveRequiredComponentsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveRequiredComponents response message
 *
 * `result` is the value the RetrieveRequiredComponents function returns (see {@link RetrieveRequiredComponentsResult}).
 */
export class RetrieveRequiredComponentsResponse extends OrganizationResponse {
  constructor(public result: RetrieveRequiredComponentsResult) {
    super("RetrieveRequiredComponents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveRequiredComponentsResponse {
    return new RetrieveRequiredComponentsResponse(
      data === undefined ? [] : (data as { value: RetrieveRequiredComponentsResult }).value
    );
  }
}
