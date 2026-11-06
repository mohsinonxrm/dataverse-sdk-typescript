import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PublishEffortAIModel action
 */
export interface msdyn_PublishEffortAIModelResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_PublishEffortAIModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PublishEffortAIModelActionParameters {
  AiModelId: string;
  TrainConfigId: string;
}

/**
 * msdyn_PublishEffortAIModel action
 *
 * Unbound action
 */
export class msdyn_PublishEffortAIModelAction implements Executable<msdyn_PublishEffortAIModelResponse> {
  constructor(public readonly parameters: msdyn_PublishEffortAIModelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PublishEffortAIModel`;

    const body = requestBody({
      AiModelId: this.parameters.AiModelId,
      TrainConfigId: this.parameters.TrainConfigId,
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

  async parseResponse(response: Response): Promise<msdyn_PublishEffortAIModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PublishEffortAIModelResponse;
  }
}
