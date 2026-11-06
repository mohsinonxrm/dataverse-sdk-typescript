import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { workflow } from "./types/index.js";

/**
 * Parameters of the CreateWorkflowFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateWorkflowFromTemplateRequestParameters {
  WorkflowName: string;
}

/**
 * CreateWorkflowFromTemplate request message
 *
 * Web API Action: CreateWorkflowFromTemplate
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CreateWorkflowFromTemplateRequest
  extends OrganizationRequest
  implements Executable<CreateWorkflowFromTemplateResponse>
{
  declare readonly Parameters: Readonly<CreateWorkflowFromTemplateRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: CreateWorkflowFromTemplateRequestParameters
  ) {
    super("CreateWorkflowFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CreateWorkflowFromTemplate`;

    const body = requestBody({
      WorkflowName: this.Parameters.WorkflowName,
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

  async parseResponse(response: Response): Promise<CreateWorkflowFromTemplateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateWorkflowFromTemplateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CreateWorkflowFromTemplate response message
 */
export class CreateWorkflowFromTemplateResponse extends OrganizationResponse {
  constructor(public result: workflow) {
    super("CreateWorkflowFromTemplate");
  }

  static fromResponse(data: unknown): CreateWorkflowFromTemplateResponse {
    return new CreateWorkflowFromTemplateResponse(responseObject<workflow>(data));
  }
}
