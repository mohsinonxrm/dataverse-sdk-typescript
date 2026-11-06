import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddRequiredDesktopFlowComponentsToSolutions action
 */
export interface AddRequiredDesktopFlowComponentsToSolutionsResponse {
  // No content returned
}

/**
 * AddRequiredDesktopFlowComponentsToSolutions action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class AddRequiredDesktopFlowComponentsToSolutionsAction implements Executable<AddRequiredDesktopFlowComponentsToSolutionsResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.AddRequiredDesktopFlowComponentsToSolutions`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<AddRequiredDesktopFlowComponentsToSolutionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddRequiredDesktopFlowComponentsToSolutionsResponse;
  }
}
