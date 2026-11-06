import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetEligibleRegardingEntities action
 */
export interface msdyn_GetEligibleRegardingEntitiesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetEligibleRegardingEntities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEligibleRegardingEntitiesActionParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetEligibleRegardingEntities action
 *
 * Unbound action
 */
export class msdyn_GetEligibleRegardingEntitiesAction implements Executable<msdyn_GetEligibleRegardingEntitiesResponse> {
  constructor(public readonly parameters: msdyn_GetEligibleRegardingEntitiesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEligibleRegardingEntities`;

    const body = requestBody({
      correlationId: this.parameters.correlationId,
      workflowId: this.parameters.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetEligibleRegardingEntitiesResponse;
    return (await response.json()) as msdyn_GetEligibleRegardingEntitiesResponse;
  }
}
