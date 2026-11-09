import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddRequiredDesktopFlowComponentsToSolutions request message
 *
 * Web API Action: AddRequiredDesktopFlowComponentsToSolutions
 *
 * The first argument is the id of the workflow record to call it on.
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
    // No return value (204 No Content)
    return Promise.resolve(new AddRequiredDesktopFlowComponentsToSolutionsResponse());
  }
}

/**
 * AddRequiredDesktopFlowComponentsToSolutions response message
 */
export class AddRequiredDesktopFlowComponentsToSolutionsResponse extends OrganizationResponse {
  constructor() {
    super("AddRequiredDesktopFlowComponentsToSolutions");
  }

  static fromResponse(_data?: unknown): AddRequiredDesktopFlowComponentsToSolutionsResponse {
    return new AddRequiredDesktopFlowComponentsToSolutionsResponse();
  }
}
