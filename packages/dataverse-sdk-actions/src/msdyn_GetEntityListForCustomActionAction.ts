import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetEntityListForCustomAction action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetEntityListForCustomActionResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdyn_GetEntityListForCustomActionResponse }).value;
  }
}
