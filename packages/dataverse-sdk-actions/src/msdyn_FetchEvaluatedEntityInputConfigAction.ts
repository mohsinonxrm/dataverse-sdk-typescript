import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FetchEvaluatedEntityInputConfig action
 */
export interface msdyn_FetchEvaluatedEntityInputConfigResponse {
  entity_data: string;
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig action
 *
 * Unbound action
 */
export class msdyn_FetchEvaluatedEntityInputConfigAction implements Executable<msdyn_FetchEvaluatedEntityInputConfigResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEvaluatedEntityInputConfig`;

    const body: Record<string, unknown> = {
      regardingEntityId: this.regardingEntityId,
      regardingEntityLogicalName: this.regardingEntityLogicalName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FetchEvaluatedEntityInputConfigResponse> {
    const data = await response.json();
    return data as msdyn_FetchEvaluatedEntityInputConfigResponse;
  }
}
