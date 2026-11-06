import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetMLPredictionResponse as msdyn_GetMLPredictionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetMLPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMLPredictionRequestParameters {
  msdyn_predictiontype: number;
  msdyn_input: string;
}

/**
 * msdyn_GetMLPrediction request message
 *
 * Web API Action: msdyn_GetMLPrediction
 */
export class msdyn_GetMLPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMLPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMLPredictionRequestParameters>;

  constructor(parameters: msdyn_GetMLPredictionRequestParameters) {
    super("msdyn_GetMLPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMLPrediction`;

    const body = requestBody({
      msdyn_predictiontype: this.Parameters.msdyn_predictiontype,
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetMLPredictionResponse.fromResponse({});
    return msdyn_GetMLPredictionResponse.fromResponse(await response.json());
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
