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

  async parseResponse(
    response: Response
  ): Promise<AddRequiredUIElementCollectionComponentsToSolutionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as AddRequiredUIElementCollectionComponentsToSolutionsResponse;
  }
}
