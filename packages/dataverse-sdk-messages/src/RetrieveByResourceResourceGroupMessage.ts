import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * RetrieveByResourceResourceGroup request message
 *
 * Web API Function: RetrieveByResourceResourceGroup
 *
 * The first argument is the id of the resource record to call it on.
 */
export class RetrieveByResourceResourceGroupRequest
  extends OrganizationRequest
  implements Executable<RetrieveByResourceResourceGroupResponse>
{
  constructor(public resourceId: string) {
    super("RetrieveByResourceResourceGroup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resources(${odataLiteral.guid(this.resourceId)})/Microsoft.Dynamics.CRM.RetrieveByResourceResourceGroup`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByResourceResourceGroupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveByResourceResourceGroupResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveByResourceResourceGroupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveByResourceResourceGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByResourceResourceGroupResult = Array<
  resourcegroup & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByResourceResourceGroup response message
 *
 * `result` is the value the RetrieveByResourceResourceGroup function returns (see {@link RetrieveByResourceResourceGroupResult}).
 */
export class RetrieveByResourceResourceGroupResponse extends OrganizationResponse {
  constructor(public result: RetrieveByResourceResourceGroupResult) {
    super("RetrieveByResourceResourceGroup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveByResourceResourceGroupResponse {
    return new RetrieveByResourceResourceGroupResponse(
      data === undefined ? [] : (data as { value: RetrieveByResourceResourceGroupResult }).value
    );
  }
}
