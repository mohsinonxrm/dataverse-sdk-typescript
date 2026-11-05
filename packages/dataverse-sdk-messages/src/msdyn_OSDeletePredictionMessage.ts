import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OSDeletePrediction request message
 *
 * Web API Action: msdyn_OSDeletePrediction
 */
export class msdyn_OSDeletePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSDeletePredictionResponse>
{
  constructor(
    public modelId: string,
    public isCrmDeleteOnly: boolean,
    public predictionName: string,
    public isActiveModel: boolean
  ) {
    super("msdyn_OSDeletePrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSDeletePrediction`;

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OSDeletePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_OSDeletePredictionResponse();
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
 * msdyn_OSDeletePrediction response message
 */
export class msdyn_OSDeletePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OSDeletePrediction");
  }

  static fromResponse(_data: unknown): msdyn_OSDeletePredictionResponse {
    return new msdyn_OSDeletePredictionResponse();
  }
}
