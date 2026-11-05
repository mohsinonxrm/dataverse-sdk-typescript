import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PublishEffortAIModel action
 */
export interface msdyn_PublishEffortAIModelResponse {
  Result: string;
}

/**
 * msdyn_PublishEffortAIModel action
 *
 * Unbound action
 */
export class msdyn_PublishEffortAIModelAction implements Executable<msdyn_PublishEffortAIModelResponse> {
  constructor(
    public readonly aiModelId: string,
    public readonly trainConfigId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PublishEffortAIModel`;

    const body: Record<string, unknown> = {
      AiModelId: this.aiModelId,
      TrainConfigId: this.trainConfigId,
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

  async parseResponse(response: Response): Promise<msdyn_PublishEffortAIModelResponse> {
    const data = await response.json();
    return data as msdyn_PublishEffortAIModelResponse;
  }
}
