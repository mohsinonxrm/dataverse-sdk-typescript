import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/**
 * Response from ListFlowsInFlowGroup function
 */
export interface ListFlowsInFlowGroupResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ListFlowsInFlowGroupResponse;
    return (await response.json()) as ListFlowsInFlowGroupResponse;
  }
}
