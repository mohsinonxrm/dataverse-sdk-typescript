import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetActionTypes action
 */
export interface msdyn_GetActionTypesResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetActionTypes action
 *
 * Unbound action
 */
export class msdyn_GetActionTypesAction implements Executable<msdyn_GetActionTypesResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetActionTypes`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetActionTypesResponse> {
    const data = await response.json();
    return data as msdyn_GetActionTypesResponse;
  }
}
