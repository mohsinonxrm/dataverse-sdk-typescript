import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the CreateWorkflowFromTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateWorkflowFromTemplateActionParameters {
  WorkflowName: string;
}

/**
 * CreateWorkflowFromTemplate action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CreateWorkflowFromTemplateAction implements Executable<CreateWorkflowFromTemplateResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: CreateWorkflowFromTemplateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CreateWorkflowFromTemplate`;

    const body = requestBody({
      WorkflowName: this.parameters.WorkflowName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateWorkflowFromTemplateResponse;
    return (await response.json()) as CreateWorkflowFromTemplateResponse;
  }
}
