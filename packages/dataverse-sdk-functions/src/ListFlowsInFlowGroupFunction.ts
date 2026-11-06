import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ListFlowsInFlowGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type ListFlowsInFlowGroupResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * ListFlowsInFlowGroup function
 *
 * Bound function
 * Binding parameter: entity (mscrm.flowgroup)
 *
 * The first argument is the id of the flowgroup record to call it on.
 */
export class ListFlowsInFlowGroupFunction implements Executable<ListFlowsInFlowGroupResponse> {
  constructor(public readonly flowgroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/flowgroups(${this.flowgroupId})/Microsoft.Dynamics.CRM.ListFlowsInFlowGroup`;

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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: ListFlowsInFlowGroupResponse }).value;
  }
}
