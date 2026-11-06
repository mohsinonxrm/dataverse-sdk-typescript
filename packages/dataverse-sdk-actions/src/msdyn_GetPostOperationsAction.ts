import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetPostOperations action
 */
export interface msdyn_GetPostOperationsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetPostOperations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPostOperationsActionParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetPostOperations action
 *
 * Unbound action
 */
export class msdyn_GetPostOperationsAction implements Executable<msdyn_GetPostOperationsResponse> {
  constructor(public readonly parameters: msdyn_GetPostOperationsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPostOperations`;

    const body = requestBody({
      workflowId: this.parameters.workflowId,
      correlationId: this.parameters.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetPostOperationsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetPostOperationsResponse;
    return (await response.json()) as msdyn_GetPostOperationsResponse;
  }
}
