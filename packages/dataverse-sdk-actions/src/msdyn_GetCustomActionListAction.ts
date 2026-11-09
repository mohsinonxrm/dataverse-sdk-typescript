import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetCustomActionList action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetCustomActionListResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdyn_GetCustomActionListResponse }).value;
  }
}
