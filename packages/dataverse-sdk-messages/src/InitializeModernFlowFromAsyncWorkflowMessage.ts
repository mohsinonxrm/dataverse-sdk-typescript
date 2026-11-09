import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { workflow } from "./types/index.js";

/**
 * InitializeModernFlowFromAsyncWorkflow request message
 *
 * Web API Action: InitializeModernFlowFromAsyncWorkflow
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class InitializeModernFlowFromAsyncWorkflowRequest
  extends OrganizationRequest
  implements Executable<InitializeModernFlowFromAsyncWorkflowResponse>
{
  constructor(public workflowId: string) {
    super("InitializeModernFlowFromAsyncWorkflow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.InitializeModernFlowFromAsyncWorkflow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<InitializeModernFlowFromAsyncWorkflowResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return InitializeModernFlowFromAsyncWorkflowResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return InitializeModernFlowFromAsyncWorkflowResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeModernFlowFromAsyncWorkflow action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type InitializeModernFlowFromAsyncWorkflowResult =
  (workflow & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * InitializeModernFlowFromAsyncWorkflow response message
 *
 * `result` is the value the InitializeModernFlowFromAsyncWorkflow action returns (see {@link InitializeModernFlowFromAsyncWorkflowResult}).
 */
export class InitializeModernFlowFromAsyncWorkflowResponse extends OrganizationResponse {
  constructor(public result: InitializeModernFlowFromAsyncWorkflowResult) {
    super("InitializeModernFlowFromAsyncWorkflow");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeModernFlowFromAsyncWorkflowResponse {
    return new InitializeModernFlowFromAsyncWorkflowResponse(
      (data ?? null) as InitializeModernFlowFromAsyncWorkflowResult
    );
  }
}
