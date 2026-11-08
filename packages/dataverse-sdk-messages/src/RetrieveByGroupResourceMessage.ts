import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { resource } from "./types/index.js";

/**
 * RetrieveByGroupResource request message
 *
 * Web API Function: RetrieveByGroupResource
 *
 * The first argument is the id of the resourcegroup record to call it on.
 */
export class RetrieveByGroupResourceRequest
  extends OrganizationRequest
  implements Executable<RetrieveByGroupResourceResponse>
{
  constructor(public resourcegroupId: string) {
    super("RetrieveByGroupResource");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${odataLiteral.guid(this.resourcegroupId)})/Microsoft.Dynamics.CRM.RetrieveByGroupResource`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByGroupResourceResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveByGroupResourceResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveByGroupResourceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveByGroupResource function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByGroupResourceResult = Array<
  resource & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByGroupResource response message
 *
 * `result` is the value the RetrieveByGroupResource function returns (see {@link RetrieveByGroupResourceResult}).
 */
export class RetrieveByGroupResourceResponse extends OrganizationResponse {
  constructor(public result: RetrieveByGroupResourceResult) {
    super("RetrieveByGroupResource");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveByGroupResourceResponse {
    return new RetrieveByGroupResourceResponse(
      data === undefined ? [] : (data as { value: RetrieveByGroupResourceResult }).value
    );
  }
}
