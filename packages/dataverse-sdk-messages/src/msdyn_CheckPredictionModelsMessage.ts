import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckPredictionModelsResponse as msdyn_CheckPredictionModelsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckPredictionModels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckPredictionModelsRequestParameters {
  PredictionType: string;
}

/**
 * msdyn_CheckPredictionModels request message
 *
 * Web API Action: msdyn_CheckPredictionModels
 */
export class msdyn_CheckPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckPredictionModelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckPredictionModelsRequestParameters>;

  constructor(parameters: msdyn_CheckPredictionModelsRequestParameters) {
    super("msdyn_CheckPredictionModels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckPredictionModels`;

    const body = requestBody({
      PredictionType: this.Parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_CheckPredictionModelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckPredictionModelsResponse.fromResponse({});
    return msdyn_CheckPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckPredictionModels response message
 */
export class msdyn_CheckPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckPredictionModelsResponseData) {
    super("msdyn_CheckPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_CheckPredictionModelsResponse {
    return new msdyn_CheckPredictionModelsResponse(
      responseObject<msdyn_CheckPredictionModelsResponseData>(data)
    );
  }
}
