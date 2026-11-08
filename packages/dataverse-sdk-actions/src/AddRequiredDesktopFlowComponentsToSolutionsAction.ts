import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the AddRequiredDesktopFlowComponentsToSolutions action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddRequiredDesktopFlowComponentsToSolutionsResponse = void;

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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.AddRequiredDesktopFlowComponentsToSolutions`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<AddRequiredDesktopFlowComponentsToSolutionsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
