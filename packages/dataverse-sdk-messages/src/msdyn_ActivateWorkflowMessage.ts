import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ActivateWorkflowResponse as msdyn_ActivateWorkflowResponseData } from "./types/index.js";

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
}

/**
 * msdyn_ActivateWorkflow response message
 */
export class msdyn_ActivateWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateWorkflowResponseData) {
    super("msdyn_ActivateWorkflow");
  }

  static fromResponse(data: unknown): msdyn_ActivateWorkflowResponse {
    return new msdyn_ActivateWorkflowResponse(
      responseObject<msdyn_ActivateWorkflowResponseData>(data)
    );
  }
}
