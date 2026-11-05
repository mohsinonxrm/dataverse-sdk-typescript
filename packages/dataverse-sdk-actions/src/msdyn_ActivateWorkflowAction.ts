import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ActivateWorkflow action
 */
export interface msdyn_ActivateWorkflowResponse {
  msdyn_ActivateWorkflowResponse: string;
}

/**
 * msdyn_ActivateWorkflow action
 *
 * Unbound action
 */
export class msdyn_ActivateWorkflowAction implements Executable<msdyn_ActivateWorkflowResponse> {
  constructor(
    public readonly msdyn_WorkflowId: string,
    public readonly msdyn_WorkflowUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateWorkflow`;

    const body: Record<string, unknown> = {
      msdyn_WorkflowId: this.msdyn_WorkflowId,
      msdyn_WorkflowUniqueName: this.msdyn_WorkflowUniqueName,
    };

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
    const data = await response.json();
    return data as msdyn_ActivateWorkflowResponse;
  }
}
