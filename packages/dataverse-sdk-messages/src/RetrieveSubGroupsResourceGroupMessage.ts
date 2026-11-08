import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * RetrieveSubGroupsResourceGroup request message
 *
 * Web API Function: RetrieveSubGroupsResourceGroup
 *
 * The first argument is the id of the resourcegroup record to call it on.
 */
export class RetrieveSubGroupsResourceGroupRequest
  extends OrganizationRequest
  implements Executable<RetrieveSubGroupsResourceGroupResponse>
{
  constructor(public resourcegroupId: string) {
    super("RetrieveSubGroupsResourceGroup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${odataLiteral.guid(this.resourcegroupId)})/Microsoft.Dynamics.CRM.RetrieveSubGroupsResourceGroup`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveSubGroupsResourceGroupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveSubGroupsResourceGroupResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveSubGroupsResourceGroupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveSubGroupsResourceGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveSubGroupsResourceGroupResult = Array<
  resourcegroup & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveSubGroupsResourceGroup response message
 *
 * `result` is the value the RetrieveSubGroupsResourceGroup function returns (see {@link RetrieveSubGroupsResourceGroupResult}).
 */
export class RetrieveSubGroupsResourceGroupResponse extends OrganizationResponse {
  constructor(public result: RetrieveSubGroupsResourceGroupResult) {
    super("RetrieveSubGroupsResourceGroup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveSubGroupsResourceGroupResponse {
    return new RetrieveSubGroupsResourceGroupResponse(
      data === undefined ? [] : (data as { value: RetrieveSubGroupsResourceGroupResult }).value
    );
  }
}
