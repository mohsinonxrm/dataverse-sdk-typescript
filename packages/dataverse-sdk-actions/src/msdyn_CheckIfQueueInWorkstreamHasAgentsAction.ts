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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfQueueInWorkstreamHasAgentsResponse;
    return (await response.json()) as msdyn_CheckIfQueueInWorkstreamHasAgentsResponse;
  }
}
