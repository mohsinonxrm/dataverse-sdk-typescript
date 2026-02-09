import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    const data = await response.json();
    return msdyn_GetMLPredictionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_predictiontype: this.msdyn_predictiontype,
      msdyn_input: this.msdyn_input,
    };
  }
}

/**
 * msdyn_GetMLPrediction response message
 */
export class msdyn_GetMLPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMLPredictionResponse) {
    super("msdyn_GetMLPrediction");
  }

  static fromResponse(data: unknown): msdyn_GetMLPredictionResponse {
    return new msdyn_GetMLPredictionResponse((data as any).value);
  }
}
