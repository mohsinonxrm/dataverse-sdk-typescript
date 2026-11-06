import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ActivateWorkflow action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ActivateWorkflowResponse {
  "@odata.context"?: string;
  msdyn_ActivateWorkflowResponse: string;
}

/**
 * Parameters of the msdyn_ActivateWorkflow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateWorkflowActionParameters {
  msdyn_WorkflowId: string;
  msdyn_WorkflowUniqueName?: string;
}

/**
 * msdyn_ActivateWorkflow action
 *
 * Unbound action
 */
export class msdyn_ActivateWorkflowAction implements Executable<msdyn_ActivateWorkflowResponse> {
  constructor(public readonly parameters: msdyn_ActivateWorkflowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateWorkflow`;

    const body = requestBody({
      msdyn_WorkflowId: this.parameters.msdyn_WorkflowId,
      msdyn_WorkflowUniqueName: this.parameters.msdyn_WorkflowUniqueName,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ActivateWorkflowResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ActivateWorkflowResponse;
  }
}
