import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ListChildDesktopFlows action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ListChildDesktopFlowsResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.ListChildDesktopFlows`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListChildDesktopFlowsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ListChildDesktopFlowsResponse;
  }
}
