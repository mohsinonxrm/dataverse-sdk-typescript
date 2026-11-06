import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCustomActionList action
 */
export interface msdyn_GetCustomActionListResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetCustomActionList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionListActionParameters {
  correlationId: string;
  workflowId: string;
  entityName: string;
}

/**
 * msdyn_GetCustomActionList action
 *
 * Unbound action
 */
export class msdyn_GetCustomActionListAction implements Executable<msdyn_GetCustomActionListResponse> {
  constructor(public readonly parameters: msdyn_GetCustomActionListActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionList`;

    const body = requestBody({
      correlationId: this.parameters.correlationId,
      workflowId: this.parameters.workflowId,
      entityName: this.parameters.entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetCustomActionListResponse;
    return (await response.json()) as msdyn_GetCustomActionListResponse;
  }
}
