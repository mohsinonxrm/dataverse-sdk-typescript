import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfQueueInWorkstreamHasAgents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfQueueInWorkstreamHasAgentsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfQueueInWorkstreamHasAgentsResponse;
  }
}
