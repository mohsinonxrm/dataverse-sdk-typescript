import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TrainEffortModel action
 */
export interface msdyn_TrainEffortModelResponse {
  Result: string;
}

/**
 * msdyn_TrainEffortModel action
 *
 * Unbound action
 */
export class msdyn_TrainEffortModelAction implements Executable<msdyn_TrainEffortModelResponse> {
  constructor(public readonly trainConfig: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrainEffortModel`;

    const body: Record<string, unknown> = {
      TrainConfig: this.trainConfig,
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

  async parseResponse(response: Response): Promise<msdyn_TrainEffortModelResponse> {
    const data = await response.json();
    return data as msdyn_TrainEffortModelResponse;
  }
}
