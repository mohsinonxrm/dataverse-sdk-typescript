import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetCustomActionList action
 */
export interface msdyn_GetCustomActionListResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetCustomActionList action
 *
 * Unbound action
 */
export class msdyn_GetCustomActionListAction implements Executable<msdyn_GetCustomActionListResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly entityName: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionList`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      entityName: this.entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionListResponse> {
    const data = await response.json();
    return data as msdyn_GetCustomActionListResponse;
  }
}
