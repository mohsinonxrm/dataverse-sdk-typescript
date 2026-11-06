import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetGPT3PredictionResponse as msdyn_GetGPT3PredictionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetGPT3Prediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetGPT3PredictionRequestParameters {
  msdyn_input: string;
  msdyn_predictiontype: number;
}

/**
 * msdyn_GetGPT3Prediction request message
 *
 * Web API Action: msdyn_GetGPT3Prediction
 */
export class msdyn_GetGPT3PredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetGPT3PredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetGPT3PredictionRequestParameters>;

  constructor(parameters: msdyn_GetGPT3PredictionRequestParameters) {
    super("msdyn_GetGPT3Prediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetGPT3Prediction`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
      msdyn_predictiontype: this.Parameters.msdyn_predictiontype,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetGPT3PredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetGPT3PredictionResponse.fromResponse({});
    return msdyn_GetGPT3PredictionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetGPT3Prediction response message
 */
export class msdyn_GetGPT3PredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetGPT3PredictionResponseData) {
    super("msdyn_GetGPT3Prediction");
  }

  static fromResponse(data: unknown): msdyn_GetGPT3PredictionResponse {
    return new msdyn_GetGPT3PredictionResponse(
      responseObject<msdyn_GetGPT3PredictionResponseData>(data)
    );
  }
}
