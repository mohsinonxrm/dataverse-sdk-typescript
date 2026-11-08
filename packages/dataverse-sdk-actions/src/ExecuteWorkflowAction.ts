import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { InputArgumentCollection, asyncoperation } from "./types/index.js";

/**
 * Response from the ExecuteWorkflow action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteWorkflowResponse =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ExecuteWorkflowResponse;
  }
}
