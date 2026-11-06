import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddRequiredUIElementCollectionComponentsToSolutions request message
 *
 * Web API Action: AddRequiredUIElementCollectionComponentsToSolutions
 *
 * The first argument is the id of the desktopflowmodule record to call it on.
 */
export class AddRequiredUIElementCollectionComponentsToSolutionsRequest
  extends OrganizationRequest
  implements Executable<AddRequiredUIElementCollectionComponentsToSolutionsResponse>
{
  constructor(public desktopflowmoduleId: string) {
    super("AddRequiredUIElementCollectionComponentsToSolutions");
  }

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
    // No return value (204 No Content)
    return new AddRequiredUIElementCollectionComponentsToSolutionsResponse();
  }
}

/**
 * AddRequiredUIElementCollectionComponentsToSolutions response message
 */
export class AddRequiredUIElementCollectionComponentsToSolutionsResponse extends OrganizationResponse {
  constructor() {
    super("AddRequiredUIElementCollectionComponentsToSolutions");
  }

  static fromResponse(_data: unknown): AddRequiredUIElementCollectionComponentsToSolutionsResponse {
    return new AddRequiredUIElementCollectionComponentsToSolutionsResponse();
  }
}
