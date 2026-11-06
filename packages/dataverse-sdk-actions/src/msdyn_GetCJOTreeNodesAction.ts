import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCJOTreeNodes action
 */
export interface msdyn_GetCJOTreeNodesResponse {
  msdyn_nodes: string;
}

/**
 * Parameters of the msdyn_GetCJOTreeNodes action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCJOTreeNodesActionParameters {
  msdyn_startingnodeid: string;
  msdyn_cjodefinition: string;
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
      msdyn_startingnodeid: this.parameters.msdyn_startingnodeid,
      msdyn_cjodefinition: this.parameters.msdyn_cjodefinition,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetCJOTreeNodesResponse;
  }
}
