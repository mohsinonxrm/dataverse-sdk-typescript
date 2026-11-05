import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddRequiredDesktopFlowComponentsToSolutions request message
 *
 * Web API Action: AddRequiredDesktopFlowComponentsToSolutions
 */
export class AddRequiredDesktopFlowComponentsToSolutionsRequest
  extends OrganizationRequest
  implements Executable<AddRequiredDesktopFlowComponentsToSolutionsResponse>
{
  constructor(public workflowId: string) {
    super("AddRequiredDesktopFlowComponentsToSolutions");
  }

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
    // No return value (204 No Content)
    return new AddRequiredDesktopFlowComponentsToSolutionsResponse();
  }
}

/**
 * AddRequiredDesktopFlowComponentsToSolutions response message
 */
export class AddRequiredDesktopFlowComponentsToSolutionsResponse extends OrganizationResponse {
  constructor() {
    super("AddRequiredDesktopFlowComponentsToSolutions");
  }

  static fromResponse(_data: unknown): AddRequiredDesktopFlowComponentsToSolutionsResponse {
    return new AddRequiredDesktopFlowComponentsToSolutionsResponse();
  }
}
