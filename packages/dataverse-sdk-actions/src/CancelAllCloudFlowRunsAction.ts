import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CancelAllCloudFlowRuns action
 */
export interface CancelAllCloudFlowRunsResponse {
  // No content returned
}

/**
 * CancelAllCloudFlowRuns action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CancelAllCloudFlowRunsAction implements Executable<CancelAllCloudFlowRunsResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CancelAllCloudFlowRuns`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CancelAllCloudFlowRunsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CancelAllCloudFlowRunsResponse;
    return (await response.json()) as CancelAllCloudFlowRunsResponse;
  }
}
