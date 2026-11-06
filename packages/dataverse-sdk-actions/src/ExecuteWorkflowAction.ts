import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { InputArgumentCollection, asyncoperation } from "./types/index.js";

/**
 * Response from ExecuteWorkflow action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ExecuteWorkflowResponse extends asyncoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the ExecuteWorkflow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteWorkflowActionParameters {
  EntityId: string;
  InputArguments?: InputArgumentCollection;
}

/**
 * ExecuteWorkflow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ExecuteWorkflowAction implements Executable<ExecuteWorkflowResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: ExecuteWorkflowActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;

    const body = requestBody({
      EntityId: this.parameters.EntityId,
      InputArguments: this.parameters.InputArguments,
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

  async parseResponse(response: Response): Promise<ExecuteWorkflowResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ExecuteWorkflowResponse;
  }
}
