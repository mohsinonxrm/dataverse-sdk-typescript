import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { resource, service } from "./types/index.js";

/**
 * Parameters of the RetrieveByResourcesService message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveByResourcesServiceRequestParameters {
  Resource: resource[];
}

/**
 * RetrieveByResourcesService request message
 *
 * Web API Function: RetrieveByResourcesService
 */
export class RetrieveByResourcesServiceRequest
  extends OrganizationRequest
  implements Executable<RetrieveByResourcesServiceResponse>
{
  declare readonly Parameters: Readonly<RetrieveByResourcesServiceRequestParameters>;

  constructor(parameters: RetrieveByResourcesServiceRequestParameters) {
    super("RetrieveByResourcesService", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveByResourcesService`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Resource !== undefined) {
      aliases.push(`Resource=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Resource, "Collection(mscrm.resource)", "Collection")
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

  async parseResponse(response: Response): Promise<RetrieveByResourcesServiceResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveByResourcesServiceResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveByResourcesServiceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveByResourcesService function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByResourcesServiceResult = Array<
  service & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByResourcesService response message
 *
 * `result` is the value the RetrieveByResourcesService function returns (see {@link RetrieveByResourcesServiceResult}).
 */
export class RetrieveByResourcesServiceResponse extends OrganizationResponse {
  constructor(public result: RetrieveByResourcesServiceResult) {
    super("RetrieveByResourcesService");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveByResourcesServiceResponse {
    return new RetrieveByResourcesServiceResponse(
      data === undefined ? [] : (data as { value: RetrieveByResourcesServiceResult }).value
    );
  }
}
