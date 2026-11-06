import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ActivateWorkflowResponse as msdyn_ActivateWorkflowResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ActivateWorkflow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateWorkflowRequestParameters {
  msdyn_WorkflowId: string;
  msdyn_WorkflowUniqueName?: string;
}

/**
 * msdyn_ActivateWorkflow request message
 *
 * Web API Action: msdyn_ActivateWorkflow
 */
export class msdyn_ActivateWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateWorkflowResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActivateWorkflowRequestParameters>;

  constructor(parameters: msdyn_ActivateWorkflowRequestParameters) {
    super("msdyn_ActivateWorkflow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateWorkflow`;

    const body = requestBody({
      msdyn_WorkflowId: this.Parameters.msdyn_WorkflowId,
      msdyn_WorkflowUniqueName: this.Parameters.msdyn_WorkflowUniqueName,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ActivateWorkflowResponse.fromResponse(text ? JSON.parse(text) : {});
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
