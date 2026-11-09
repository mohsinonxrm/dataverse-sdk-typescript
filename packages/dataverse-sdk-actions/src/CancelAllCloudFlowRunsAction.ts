import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the CancelAllCloudFlowRuns action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CancelAllCloudFlowRunsResponse = void;

/**
 * CancelAllCloudFlowRuns action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CancelAllCloudFlowRunsAction implements Executable<CancelAllCloudFlowRunsResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.CancelAllCloudFlowRuns`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<CancelAllCloudFlowRunsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
