import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetEntityList action
 */
export interface msdyn_GetEntityListResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetEntityList action
 *
 * Unbound action
 */
export class msdyn_GetEntityListAction implements Executable<msdyn_GetEntityListResponse> {
  constructor(
    public readonly correlationId: string,
    public readonly workflowId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityList`;

    const body: Record<string, unknown> = {
      correlationId: this.correlationId,
      workflowId: this.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListResponse> {
    const data = await response.json();
    return data as msdyn_GetEntityListResponse;
  }
}
