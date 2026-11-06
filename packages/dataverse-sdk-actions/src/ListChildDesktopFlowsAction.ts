import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ListChildDesktopFlows action
 */
export interface ListChildDesktopFlowsResponse {
  childFlows: string;
}

/**
 * ListChildDesktopFlows action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ListChildDesktopFlowsAction implements Executable<ListChildDesktopFlowsResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ListChildDesktopFlows`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListChildDesktopFlowsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ListChildDesktopFlowsResponse;
  }
}
