import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSankeyViewKPIs action
 */
export interface msdyn_GetSankeyViewKPIsResponse {
  SankeyViewKPIs: string;
}

/**
 * msdyn_GetSankeyViewKPIs action
 *
 * Unbound action
 */
export class msdyn_GetSankeyViewKPIsAction implements Executable<msdyn_GetSankeyViewKPIsResponse> {
  constructor(
    public readonly actionIds: string,
    public readonly sequenceId: string,
    public readonly regardingEntityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyViewKPIs`;

    const body: Record<string, unknown> = {
      ActionIds: this.actionIds,
      SequenceId: this.sequenceId,
      RegardingEntityName: this.regardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyViewKPIsResponse> {
    const data = await response.json();
    return data as msdyn_GetSankeyViewKPIsResponse;
  }
}
