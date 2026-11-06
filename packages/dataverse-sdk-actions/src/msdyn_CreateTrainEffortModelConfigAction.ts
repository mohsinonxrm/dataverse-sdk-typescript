import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateTrainEffortModelConfig action
 */
export interface msdyn_CreateTrainEffortModelConfigResponse {
  TrainConfig: string;
}

/**
 * Parameters of the msdyn_CreateTrainEffortModelConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateTrainEffortModelConfigActionParameters {
  EntityLogicalName: string;
  RecordId: string;
  DataBinding: string;
  CustomConfig: string;
}

/**
 * msdyn_CreateTrainEffortModelConfig action
 *
 * Unbound action
 */
export class msdyn_CreateTrainEffortModelConfigAction implements Executable<msdyn_CreateTrainEffortModelConfigResponse> {
  constructor(public readonly parameters: msdyn_CreateTrainEffortModelConfigActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTrainEffortModelConfig`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordId: this.parameters.RecordId,
      DataBinding: this.parameters.DataBinding,
      CustomConfig: this.parameters.CustomConfig,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTrainEffortModelConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateTrainEffortModelConfigResponse;
    return (await response.json()) as msdyn_CreateTrainEffortModelConfigResponse;
  }
}
