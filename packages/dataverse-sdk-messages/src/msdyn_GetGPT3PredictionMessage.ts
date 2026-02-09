import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetGPT3Prediction request message
 *
 * Web API Action: msdyn_GetGPT3Prediction
 */
export class msdyn_GetGPT3PredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetGPT3PredictionResponse>
{
  constructor(
    public msdyn_input: string,
    public msdyn_predictiontype: number
  ) {
    super("msdyn_GetGPT3Prediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetGPT3Prediction`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
      msdyn_predictiontype: this.msdyn_predictiontype,
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

  async parseResponse(response: Response): Promise<msdyn_GetGPT3PredictionResponse> {
    const data = await response.json();
    return msdyn_GetGPT3PredictionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_input: this.msdyn_input,
      msdyn_predictiontype: this.msdyn_predictiontype,
    };
  }
}

/**
 * msdyn_GetGPT3Prediction response message
 */
export class msdyn_GetGPT3PredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetGPT3PredictionResponse) {
    super("msdyn_GetGPT3Prediction");
  }

  static fromResponse(data: unknown): msdyn_GetGPT3PredictionResponse {
    return new msdyn_GetGPT3PredictionResponse((data as any).value);
  }
}
