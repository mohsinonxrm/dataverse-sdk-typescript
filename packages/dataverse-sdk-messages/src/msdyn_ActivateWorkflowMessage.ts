import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ActivateWorkflowResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ActivateWorkflow action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ActivateWorkflowResult {
  "@odata.context"?: string;
  msdyn_ActivateWorkflowResponse: string;
}

/**
 * msdyn_ActivateWorkflow response message
 *
 * `result` is the value the msdyn_ActivateWorkflow action returns (see {@link msdyn_ActivateWorkflowResult}).
 */
export class msdyn_ActivateWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateWorkflowResult) {
    super("msdyn_ActivateWorkflow");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ActivateWorkflowResponse {
    return new msdyn_ActivateWorkflowResponse(data as msdyn_ActivateWorkflowResult);
  }
}
