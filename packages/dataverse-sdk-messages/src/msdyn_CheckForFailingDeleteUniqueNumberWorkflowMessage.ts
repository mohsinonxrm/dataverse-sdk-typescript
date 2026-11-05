import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse as msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponseData } from "./types/index.js";

/**
 * msdyn_CheckForFailingDeleteUniqueNumberWorkflow request message
 *
 * Web API Action: msdyn_CheckForFailingDeleteUniqueNumberWorkflow
 */
export class msdyn_CheckForFailingDeleteUniqueNumberWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse>
{
  constructor() {
    super("msdyn_CheckForFailingDeleteUniqueNumberWorkflow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForFailingDeleteUniqueNumberWorkflow`;

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
  ): Promise<msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse> {
    const data = await response.json();
    return msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForFailingDeleteUniqueNumberWorkflow response message
 */
export class msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponseData) {
    super("msdyn_CheckForFailingDeleteUniqueNumberWorkflow");
  }

  static fromResponse(data: unknown): msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse {
    return new msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse(
      responseObject<msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponseData>(data)
    );
  }
}
