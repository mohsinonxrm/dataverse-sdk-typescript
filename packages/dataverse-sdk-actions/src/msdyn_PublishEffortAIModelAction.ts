import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PublishEffortAIModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PublishEffortAIModelResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_PublishEffortAIModelResponse;
  }
}
