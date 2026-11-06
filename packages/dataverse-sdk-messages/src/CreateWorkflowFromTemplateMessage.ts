import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { workflow } from "./types/index.js";

/**
 * Parameters of the CreateWorkflowFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateWorkflowFromTemplateRequestParameters {
  WorkflowName: string;
}

/**
 * CreateWorkflowFromTemplate request message
 *
 * Web API Action: CreateWorkflowFromTemplate
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CreateWorkflowFromTemplateRequest
  extends OrganizationRequest
  implements Executable<CreateWorkflowFromTemplateResponse>
{
  declare readonly Parameters: Readonly<CreateWorkflowFromTemplateRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: CreateWorkflowFromTemplateRequestParameters
  ) {
    super("CreateWorkflowFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CreateWorkflowFromTemplate`;

    const body = requestBody({
      WorkflowName: this.Parameters.WorkflowName,
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CreateWorkflowFromTemplateResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CreateWorkflowFromTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateWorkflowFromTemplate action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CreateWorkflowFromTemplateResult =
  (workflow & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * CreateWorkflowFromTemplate response message
 *
 * `result` is the value the CreateWorkflowFromTemplate action returns (see {@link CreateWorkflowFromTemplateResult}).
 */
export class CreateWorkflowFromTemplateResponse extends OrganizationResponse {
  constructor(public result: CreateWorkflowFromTemplateResult) {
    super("CreateWorkflowFromTemplate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateWorkflowFromTemplateResponse {
    return new CreateWorkflowFromTemplateResponse(
      (data ?? null) as CreateWorkflowFromTemplateResult
    );
  }
}
