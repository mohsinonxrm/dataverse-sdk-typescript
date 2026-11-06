import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetEntityList action
 */
export interface msdyn_GetEntityListResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetEntityList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityListActionParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetEntityList action
 *
 * Unbound action
 */
export class msdyn_GetEntityListAction implements Executable<msdyn_GetEntityListResponse> {
  constructor(public readonly parameters: msdyn_GetEntityListActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityList`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetEntityListResponse;
  }
}
