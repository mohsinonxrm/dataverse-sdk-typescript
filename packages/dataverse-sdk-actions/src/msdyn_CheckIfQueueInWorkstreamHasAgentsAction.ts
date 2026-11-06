import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfQueueInWorkstreamHasAgents action
 */
export interface msdyn_CheckIfQueueInWorkstreamHasAgentsResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfQueueInWorkstreamHasAgents action
 *
 * Unbound action
 */
export class msdyn_CheckIfQueueInWorkstreamHasAgentsAction implements Executable<msdyn_CheckIfQueueInWorkstreamHasAgentsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfQueueInWorkstreamHasAgents`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfQueueInWorkstreamHasAgentsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfQueueInWorkstreamHasAgentsResponse;
  }
}
