import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetActionTypes action
 */
export interface msdyn_GetActionTypesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetActionTypes action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetActionTypesActionParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetActionTypes action
 *
 * Unbound action
 */
export class msdyn_GetActionTypesAction implements Executable<msdyn_GetActionTypesResponse> {
  constructor(public readonly parameters: msdyn_GetActionTypesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetActionTypes`;

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

  async parseResponse(response: Response): Promise<msdyn_GetActionTypesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetActionTypesResponse;
  }
}
