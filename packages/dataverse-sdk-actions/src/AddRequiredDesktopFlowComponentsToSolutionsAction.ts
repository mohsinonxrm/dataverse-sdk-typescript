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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<AddRequiredDesktopFlowComponentsToSolutionsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
