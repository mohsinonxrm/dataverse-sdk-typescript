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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListChildDesktopFlowsResponse> {
    const data = await response.json();
    return data as ListChildDesktopFlowsResponse;
  }
}
