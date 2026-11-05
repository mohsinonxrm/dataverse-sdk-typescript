import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ActivateWorkflow request message
 *
 * Web API Action: msdyn_ActivateWorkflow
 */
export class msdyn_ActivateWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateWorkflowResponse>
{
  constructor(
    public msdyn_WorkflowId: string,
    public msdyn_WorkflowUniqueName: string
  ) {
    super("msdyn_ActivateWorkflow");
  }

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
    return msdyn_ActivateWorkflowResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_WorkflowId: this.msdyn_WorkflowId,
      msdyn_WorkflowUniqueName: this.msdyn_WorkflowUniqueName,
    };
  }
}

/**
 * msdyn_ActivateWorkflow response message
 */
export class msdyn_ActivateWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateWorkflowResponse) {
    super("msdyn_ActivateWorkflow");
  }

  static fromResponse(data: unknown): msdyn_ActivateWorkflowResponse {
    return new msdyn_ActivateWorkflowResponse((data as any).value);
  }
}
