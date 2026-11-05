import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckPredictionModels request message
 *
 * Web API Action: msdyn_CheckPredictionModels
 */
export class msdyn_CheckPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckPredictionModelsResponse>
{
  constructor(public predictionType: string) {
    super("msdyn_CheckPredictionModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckPredictionModels`;

    const body: Record<string, unknown> = {
      PredictionType: this.predictionType,
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

  async parseResponse(response: Response): Promise<msdyn_CheckPredictionModelsResponse> {
    const data = await response.json();
    return msdyn_CheckPredictionModelsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionType: this.predictionType,
    };
  }
}

/**
 * msdyn_CheckPredictionModels response message
 */
export class msdyn_CheckPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckPredictionModelsResponse) {
    super("msdyn_CheckPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_CheckPredictionModelsResponse {
    return new msdyn_CheckPredictionModelsResponse((data as any).value);
  }
}
