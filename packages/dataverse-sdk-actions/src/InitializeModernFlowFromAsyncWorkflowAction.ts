import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { workflow } from "./types/index.js";

/**
 * Response from InitializeModernFlowFromAsyncWorkflow action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface InitializeModernFlowFromAsyncWorkflowResponse extends workflow {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * InitializeModernFlowFromAsyncWorkflow action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 */
export class InitializeModernFlowFromAsyncWorkflowAction implements Executable<InitializeModernFlowFromAsyncWorkflowResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.InitializeModernFlowFromAsyncWorkflow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<InitializeModernFlowFromAsyncWorkflowResponse> {
    const data = await response.json();
    return data as InitializeModernFlowFromAsyncWorkflowResponse;
  }
}
