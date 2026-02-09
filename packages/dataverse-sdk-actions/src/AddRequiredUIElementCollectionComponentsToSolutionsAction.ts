import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddRequiredUIElementCollectionComponentsToSolutions action
 */
export interface AddRequiredUIElementCollectionComponentsToSolutionsResponse {
  // No content returned
}

/**
 * AddRequiredUIElementCollectionComponentsToSolutions action
 *
 * Bound action
 * Binding parameter: entity (mscrm.desktopflowmodule)
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<AddRequiredUIElementCollectionComponentsToSolutionsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
