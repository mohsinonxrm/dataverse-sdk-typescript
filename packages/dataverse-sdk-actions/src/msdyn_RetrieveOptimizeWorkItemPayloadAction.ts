import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveOptimizeWorkItemPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveOptimizeWorkItemPayloadResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveOptimizeWorkItemPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOptimizeWorkItemPayloadActionParameters {
  WorkItemId: string;
  WorkflowRunId?: string;
}

/**
 * msdyn_RetrieveOptimizeWorkItemPayload action
 *
 * Unbound action
 */
export class msdyn_RetrieveOptimizeWorkItemPayloadAction implements Executable<msdyn_RetrieveOptimizeWorkItemPayloadResponse> {
  constructor(public readonly parameters: msdyn_RetrieveOptimizeWorkItemPayloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOptimizeWorkItemPayload`;

    const body = requestBody({
      WorkItemId: this.parameters.WorkItemId,
      WorkflowRunId: this.parameters.WorkflowRunId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOptimizeWorkItemPayloadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveOptimizeWorkItemPayloadResponse;
  }
}
