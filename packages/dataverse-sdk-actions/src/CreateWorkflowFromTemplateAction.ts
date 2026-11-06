import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { workflow } from "./types/index.js";

/**
 * Response from CreateWorkflowFromTemplate action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CreateWorkflowFromTemplateResponse extends workflow {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CreateWorkflowFromTemplate action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 */
export class CreateWorkflowFromTemplateAction implements Executable<CreateWorkflowFromTemplateResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly workflowName: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateWorkflowFromTemplateResponse> {
    const data = await response.json();
    return data as CreateWorkflowFromTemplateResponse;
  }
}
