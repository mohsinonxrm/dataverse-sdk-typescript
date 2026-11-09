import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetCJOTreeNodes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCJOTreeNodesResponse {
  "@odata.context"?: string;
  msdyn_nodes: string;
}

/**
 * Parameters of the msdyn_GetCJOTreeNodes action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCJOTreeNodesActionParameters {
  msdyn_cjodefinition: string;
  msdyn_startingnodeid: string;
}

/**
 * msdyn_GetCJOTreeNodes action
 *
 * Unbound action
 */
export class msdyn_GetCJOTreeNodesAction implements Executable<msdyn_GetCJOTreeNodesResponse> {
  constructor(public readonly parameters: msdyn_GetCJOTreeNodesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCJOTreeNodes`;

    const body = requestBody({
      msdyn_cjodefinition: this.parameters.msdyn_cjodefinition,
      msdyn_startingnodeid: this.parameters.msdyn_startingnodeid,
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

  async parseResponse(response: Response): Promise<msdyn_GetCJOTreeNodesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCJOTreeNodesResponse;
  }
}
