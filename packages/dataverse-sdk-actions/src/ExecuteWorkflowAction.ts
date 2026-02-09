import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { InputArgumentCollection, asyncoperation } from "./types/index.js";

/**
 * Response from ExecuteWorkflow action
 */
export interface ExecuteWorkflowResponse {
  value: asyncoperation;
}

/**
 * ExecuteWorkflow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 */
export class ExecuteWorkflowAction implements Executable<ExecuteWorkflowResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly entityId: string,
    public readonly inputArguments: InputArgumentCollection
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;

    const body: Record<string, unknown> = {
      EntityId: this.entityId,
      InputArguments: this.inputArguments,
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

  async parseResponse(response: Response): Promise<ExecuteWorkflowResponse> {
    const data = await response.json();
    return data as ExecuteWorkflowResponse;
  }
}
