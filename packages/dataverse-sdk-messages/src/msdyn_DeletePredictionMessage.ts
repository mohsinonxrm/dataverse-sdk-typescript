import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DeletePrediction request message
 *
 * Web API Action: msdyn_DeletePrediction
 */
export class msdyn_DeletePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeletePredictionResponse>
{
  constructor(
    public modelId: string,
    public isCrmDeleteOnly: boolean,
    public predictionName: string,
    public isActiveModel: boolean
  ) {
    super("msdyn_DeletePrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeletePrediction`;

    const body: Record<string, unknown> = {
      ModelId: this.modelId,
      IsCrmDeleteOnly: this.isCrmDeleteOnly,
      PredictionName: this.predictionName,
      IsActiveModel: this.isActiveModel,
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

  async parseResponse(response: Response): Promise<msdyn_DeletePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_DeletePredictionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ModelId: this.modelId,
      IsCrmDeleteOnly: this.isCrmDeleteOnly,
      PredictionName: this.predictionName,
      IsActiveModel: this.isActiveModel,
    };
  }
}

/**
 * msdyn_DeletePrediction response message
 */
export class msdyn_DeletePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DeletePrediction");
  }

  static fromResponse(_data: unknown): msdyn_DeletePredictionResponse {
    return new msdyn_DeletePredictionResponse();
  }
}
