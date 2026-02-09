import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateTrainEffortModelConfig action
 */
export interface msdyn_CreateTrainEffortModelConfigResponse {
  TrainConfig: string;
}

/**
 * msdyn_CreateTrainEffortModelConfig action
 *
 * Unbound action
 */
export class msdyn_CreateTrainEffortModelConfigAction implements Executable<msdyn_CreateTrainEffortModelConfigResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string,
    public readonly dataBinding: string,
    public readonly customConfig: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTrainEffortModelConfig`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      DataBinding: this.dataBinding,
      CustomConfig: this.customConfig,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTrainEffortModelConfigResponse> {
    const data = await response.json();
    return data as msdyn_CreateTrainEffortModelConfigResponse;
  }
}
