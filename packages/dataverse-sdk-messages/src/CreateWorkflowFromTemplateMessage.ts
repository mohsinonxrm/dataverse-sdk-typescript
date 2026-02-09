import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { workflow } from "./types/index.js";

/**
 * CreateWorkflowFromTemplate request message
 *
 * Web API Action: CreateWorkflowFromTemplate
 */
export class CreateWorkflowFromTemplateRequest
  extends OrganizationRequest
  implements Executable<CreateWorkflowFromTemplateResponse>
{
  constructor(
    public workflowId: string,
    public workflowName: string
  ) {
    super("CreateWorkflowFromTemplate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CreateWorkflowFromTemplate`;

    const body: Record<string, unknown> = {
      WorkflowName: this.workflowName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateWorkflowFromTemplateResponse> {
    const data = await response.json();
    return CreateWorkflowFromTemplateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.workflowId,
      WorkflowName: this.workflowName,
    };
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
    return new CreateWorkflowFromTemplateResponse((data as any).value);
  }
}
