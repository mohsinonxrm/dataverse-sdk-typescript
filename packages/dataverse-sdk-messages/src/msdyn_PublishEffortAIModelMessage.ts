import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PublishEffortAIModel request message
 *
 * Web API Action: msdyn_PublishEffortAIModel
 */
export class msdyn_PublishEffortAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_PublishEffortAIModelResponse>
{
  constructor(
    public aiModelId: string,
    public trainConfigId: string
  ) {
    super("msdyn_PublishEffortAIModel");
  }

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
    return msdyn_PublishEffortAIModelResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AiModelId: this.aiModelId,
      TrainConfigId: this.trainConfigId,
    };
  }
}

/**
 * msdyn_PublishEffortAIModel response message
 */
export class msdyn_PublishEffortAIModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_PublishEffortAIModelResponse) {
    super("msdyn_PublishEffortAIModel");
  }

  static fromResponse(data: unknown): msdyn_PublishEffortAIModelResponse {
    return new msdyn_PublishEffortAIModelResponse((data as any).value);
  }
}
