import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EffortModelPrediction request message
 *
 * Web API Action: msdyn_EffortModelPrediction
 */
export class msdyn_EffortModelPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EffortModelPredictionResponse>
{
  constructor(
    public inputRequest: string,
    public aiModelId: string
  ) {
    super("msdyn_EffortModelPrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EffortModelPrediction`;

    const body: Record<string, unknown> = {
      InputRequest: this.inputRequest,
      AiModelId: this.aiModelId,
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

  async parseResponse(response: Response): Promise<msdyn_EffortModelPredictionResponse> {
    const data = await response.json();
    return msdyn_EffortModelPredictionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputRequest: this.inputRequest,
      AiModelId: this.aiModelId,
    };
  }
}

/**
 * msdyn_EffortModelPrediction response message
 */
export class msdyn_EffortModelPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EffortModelPredictionResponse) {
    super("msdyn_EffortModelPrediction");
  }

  static fromResponse(data: unknown): msdyn_EffortModelPredictionResponse {
    return new msdyn_EffortModelPredictionResponse((data as any).value);
  }
}
