import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetNextRunsForFlowTrigger function
 */
export interface GetNextRunsForFlowTriggerResponse {
  response: string;
}

/**
 * GetNextRunsForFlowTrigger function
 *
 * Bound function
 * Binding parameter: entity (mscrm.flowtrigger)
 *
 * The first argument is the id of the flowtrigger record to call it on.
 */
export class GetNextRunsForFlowTriggerFunction implements Executable<GetNextRunsForFlowTriggerResponse> {
  constructor(public readonly flowtriggerId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/flowtriggers(${this.flowtriggerId})/Microsoft.Dynamics.CRM.GetNextRunsForFlowTrigger`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetNextRunsForFlowTriggerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetNextRunsForFlowTriggerResponse;
    return (await response.json()) as GetNextRunsForFlowTriggerResponse;
  }
}
