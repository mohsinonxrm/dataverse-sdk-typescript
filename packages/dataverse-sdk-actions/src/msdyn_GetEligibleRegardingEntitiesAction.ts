import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetEligibleRegardingEntities action
 */
export interface msdyn_GetEligibleRegardingEntitiesResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetEligibleRegardingEntities action
 *
 * Unbound action
 */
export class msdyn_GetEligibleRegardingEntitiesAction implements Executable<msdyn_GetEligibleRegardingEntitiesResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEligibleRegardingEntities`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    const data = await response.json();
    return data as msdyn_GetEligibleRegardingEntitiesResponse;
  }
}
