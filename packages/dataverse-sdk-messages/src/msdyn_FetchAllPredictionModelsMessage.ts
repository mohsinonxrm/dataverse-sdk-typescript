import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FetchAllPredictionModels request message
 *
 * Web API Action: msdyn_FetchAllPredictionModels
 */
export class msdyn_FetchAllPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchAllPredictionModelsResponse>
{
  constructor(public predictionType: string) {
    super("msdyn_FetchAllPredictionModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchAllPredictionModels`;

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

  async parseResponse(response: Response): Promise<msdyn_FetchAllPredictionModelsResponse> {
    const data = await response.json();
    return msdyn_FetchAllPredictionModelsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionType: this.predictionType,
    };
  }
}

/**
 * msdyn_FetchAllPredictionModels response message
 */
export class msdyn_FetchAllPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchAllPredictionModelsResponse) {
    super("msdyn_FetchAllPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_FetchAllPredictionModelsResponse {
    return new msdyn_FetchAllPredictionModelsResponse((data as any).value);
  }
}
