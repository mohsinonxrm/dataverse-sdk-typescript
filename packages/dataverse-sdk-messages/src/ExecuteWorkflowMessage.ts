import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { InputArgumentCollection, asyncoperation } from "./types/index.js";

/**
 * Parameters of the ExecuteWorkflow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteWorkflowRequestParameters {
  EntityId: string;
  InputArguments?: InputArgumentCollection;
}

/**
 * ExecuteWorkflow request message
 *
 * Web API Action: ExecuteWorkflow
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ExecuteWorkflowRequest
  extends OrganizationRequest
  implements Executable<ExecuteWorkflowResponse>
{
  declare readonly Parameters: Readonly<ExecuteWorkflowRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: ExecuteWorkflowRequestParameters
  ) {
    super("ExecuteWorkflow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
      InputArguments: this.Parameters.InputArguments,
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
    if (response.status === 204) return ExecuteWorkflowResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ExecuteWorkflowResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExecuteWorkflow action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteWorkflowResult =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * ExecuteWorkflow response message
 *
 * `result` is the value the ExecuteWorkflow action returns (see {@link ExecuteWorkflowResult}).
 */
export class ExecuteWorkflowResponse extends OrganizationResponse {
  constructor(public result: ExecuteWorkflowResult) {
    super("ExecuteWorkflow");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExecuteWorkflowResponse {
    return new ExecuteWorkflowResponse((data ?? null) as ExecuteWorkflowResult);
  }
}
