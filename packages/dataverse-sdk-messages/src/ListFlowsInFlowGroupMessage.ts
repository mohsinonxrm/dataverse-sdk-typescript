import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ListFlowsInFlowGroup request message
 *
 * Web API Function: ListFlowsInFlowGroup
 *
 * The first argument is the id of the flowgroup record to call it on.
 */
export class ListFlowsInFlowGroupRequest
  extends OrganizationRequest
  implements Executable<ListFlowsInFlowGroupResponse>
{
  constructor(public flowgroupId: string) {
    super("ListFlowsInFlowGroup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/flowgroups(${odataLiteral.guid(this.flowgroupId)})/Microsoft.Dynamics.CRM.ListFlowsInFlowGroup`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListFlowsInFlowGroupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return ListFlowsInFlowGroupResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ListFlowsInFlowGroupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ListFlowsInFlowGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type ListFlowsInFlowGroupResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * ListFlowsInFlowGroup response message
 *
 * `result` is the value the ListFlowsInFlowGroup function returns (see {@link ListFlowsInFlowGroupResult}).
 */
export class ListFlowsInFlowGroupResponse extends OrganizationResponse {
  constructor(public result: ListFlowsInFlowGroupResult) {
    super("ListFlowsInFlowGroup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ListFlowsInFlowGroupResponse {
    return new ListFlowsInFlowGroupResponse(
      data === undefined ? [] : (data as { value: ListFlowsInFlowGroupResult }).value
    );
  }
}
