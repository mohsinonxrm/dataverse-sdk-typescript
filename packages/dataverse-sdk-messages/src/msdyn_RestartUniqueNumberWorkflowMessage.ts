import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RestartUniqueNumberWorkflowResponse as msdyn_RestartUniqueNumberWorkflowResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RestartUniqueNumberWorkflow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RestartUniqueNumberWorkflowRequestParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_RestartUniqueNumberWorkflow request message
 *
 * Web API Action: msdyn_RestartUniqueNumberWorkflow
 */
export class msdyn_RestartUniqueNumberWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_RestartUniqueNumberWorkflowResponse>
{
  declare readonly Parameters: Readonly<msdyn_RestartUniqueNumberWorkflowRequestParameters>;

  constructor(parameters: msdyn_RestartUniqueNumberWorkflowRequestParameters) {
    super("msdyn_RestartUniqueNumberWorkflow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartUniqueNumberWorkflow`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_RestartUniqueNumberWorkflowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RestartUniqueNumberWorkflowResponse.fromResponse({});
    return msdyn_RestartUniqueNumberWorkflowResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RestartUniqueNumberWorkflow response message
 */
export class msdyn_RestartUniqueNumberWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_RestartUniqueNumberWorkflowResponseData) {
    super("msdyn_RestartUniqueNumberWorkflow");
  }

  static fromResponse(data: unknown): msdyn_RestartUniqueNumberWorkflowResponse {
    return new msdyn_RestartUniqueNumberWorkflowResponse(
      responseObject<msdyn_RestartUniqueNumberWorkflowResponseData>(data)
    );
  }
}
