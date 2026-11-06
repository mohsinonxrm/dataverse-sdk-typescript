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
  correlationId: string;
  workflowId: string;
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

  async parseResponse(response: Response): Promise<msdyn_GetActionTypesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetActionTypesResponse;
    return (await response.json()) as msdyn_GetActionTypesResponse;
  }
}
