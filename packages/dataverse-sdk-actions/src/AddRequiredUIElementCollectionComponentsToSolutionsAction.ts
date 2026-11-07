import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the AddRequiredUIElementCollectionComponentsToSolutions action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddRequiredUIElementCollectionComponentsToSolutionsResponse = void;

/**
 * AddRequiredUIElementCollectionComponentsToSolutions action
 *
 * Bound action
 * Binding parameter: entity (mscrm.desktopflowmodule)
 *
 * The first argument is the id of the desktopflowmodule record to call it on.
 */
export class AddRequiredUIElementCollectionComponentsToSolutionsAction implements Executable<AddRequiredUIElementCollectionComponentsToSolutionsResponse> {
  constructor(public readonly desktopflowmoduleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/desktopflowmodules(${this.desktopflowmoduleId})/Microsoft.Dynamics.CRM.AddRequiredUIElementCollectionComponentsToSolutions`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(
    _response: Response
  ): Promise<AddRequiredUIElementCollectionComponentsToSolutionsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
