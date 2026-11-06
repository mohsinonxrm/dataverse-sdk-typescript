import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
  workflowId: string;
  correlationId: string;
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

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetEligibleRegardingEntitiesResponse;
  }
}
