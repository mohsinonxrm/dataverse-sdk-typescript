import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EffortModelPredictionResponse as msdyn_EffortModelPredictionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EffortModelPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EffortModelPredictionRequestParameters {
  InputRequest: string;
  AiModelId: string;
}

/**
 * msdyn_EffortModelPrediction request message
 *
 * Web API Action: msdyn_EffortModelPrediction
 */
export class msdyn_EffortModelPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EffortModelPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EffortModelPredictionRequestParameters>;

  constructor(parameters: msdyn_EffortModelPredictionRequestParameters) {
    super("msdyn_EffortModelPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EffortModelPrediction`;

    const body = requestBody({
      InputRequest: this.Parameters.InputRequest,
      AiModelId: this.Parameters.AiModelId,
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

  async parseResponse(response: Response): Promise<msdyn_EffortModelPredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_EffortModelPredictionResponse.fromResponse({});
    return msdyn_EffortModelPredictionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EffortModelPrediction response message
 */
export class msdyn_EffortModelPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EffortModelPredictionResponseData) {
    super("msdyn_EffortModelPrediction");
  }

  static fromResponse(data: unknown): msdyn_EffortModelPredictionResponse {
    return new msdyn_EffortModelPredictionResponse(
      responseObject<msdyn_EffortModelPredictionResponseData>(data)
    );
  }
}
