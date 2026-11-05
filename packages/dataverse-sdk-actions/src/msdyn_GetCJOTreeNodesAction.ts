import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCJOTreeNodes action
 */
export interface msdyn_GetCJOTreeNodesResponse {
  msdyn_nodes: string;
}

/**
 * msdyn_GetCJOTreeNodes action
 *
 * Unbound action
 */
export class msdyn_GetCJOTreeNodesAction implements Executable<msdyn_GetCJOTreeNodesResponse> {
  constructor(
    public readonly msdyn_startingnodeid: string,
    public readonly msdyn_cjodefinition: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCJOTreeNodes`;

    const body: Record<string, unknown> = {
      msdyn_startingnodeid: this.msdyn_startingnodeid,
      msdyn_cjodefinition: this.msdyn_cjodefinition,
    };

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
    const data = await response.json();
    return data as msdyn_GetCJOTreeNodesResponse;
  }
}
