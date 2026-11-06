import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetEntityListForCustomAction action
 */
export interface msdyn_GetEntityListForCustomActionResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetEntityListForCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityListForCustomActionActionParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetEntityListForCustomAction action
 *
 * Unbound action
 */
export class msdyn_GetEntityListForCustomActionAction implements Executable<msdyn_GetEntityListForCustomActionResponse> {
  constructor(public readonly parameters: msdyn_GetEntityListForCustomActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityListForCustomAction`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListForCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetEntityListForCustomActionResponse;
  }
}
