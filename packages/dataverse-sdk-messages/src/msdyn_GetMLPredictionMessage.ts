import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetMLPredictionResponse as msdyn_GetMLPredictionResponseData } from "./types/index.js";

/**
 * msdyn_GetMLPrediction request message
 *
 * Web API Action: msdyn_GetMLPrediction
 */
export class msdyn_GetMLPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMLPredictionResponse>
{
  constructor(
    public msdyn_predictiontype: number,
    public msdyn_input: string
  ) {
    super("msdyn_GetMLPrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMLPrediction`;

    const body: Record<string, unknown> = {
      msdyn_predictiontype: this.msdyn_predictiontype,
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    const data = await response.json();
    return msdyn_GetMLPredictionResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetMLPrediction response message
 */
export class msdyn_GetMLPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMLPredictionResponseData) {
    super("msdyn_GetMLPrediction");
  }

  static fromResponse(data: unknown): msdyn_GetMLPredictionResponse {
    return new msdyn_GetMLPredictionResponse(
      responseObject<msdyn_GetMLPredictionResponseData>(data)
    );
  }
}
