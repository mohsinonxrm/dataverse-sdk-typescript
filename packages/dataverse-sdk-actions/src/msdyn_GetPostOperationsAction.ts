import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetPostOperations action
 */
export interface msdyn_GetPostOperationsResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetPostOperations action
 *
 * Unbound action
 */
export class msdyn_GetPostOperationsAction implements Executable<msdyn_GetPostOperationsResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPostOperations`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetPostOperationsResponse> {
    const data = await response.json();
    return data as msdyn_GetPostOperationsResponse;
  }
}
