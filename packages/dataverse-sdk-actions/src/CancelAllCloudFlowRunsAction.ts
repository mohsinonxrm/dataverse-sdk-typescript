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
    // No return value (204 No Content)
    return {};
  }
}
