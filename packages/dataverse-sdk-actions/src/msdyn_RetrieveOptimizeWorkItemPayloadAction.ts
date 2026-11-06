import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveOptimizeWorkItemPayload action
 */
export interface msdyn_RetrieveOptimizeWorkItemPayloadResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveOptimizeWorkItemPayloadResponse;
    return (await response.json()) as msdyn_RetrieveOptimizeWorkItemPayloadResponse;
  }
}
