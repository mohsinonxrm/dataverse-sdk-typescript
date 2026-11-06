import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FetchAllPredictionModelsResponse as msdyn_FetchAllPredictionModelsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FetchAllPredictionModels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchAllPredictionModelsRequestParameters {
  PredictionType: string;
}

/**
 * msdyn_FetchAllPredictionModels request message
 *
 * Web API Action: msdyn_FetchAllPredictionModels
 */
export class msdyn_FetchAllPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchAllPredictionModelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchAllPredictionModelsRequestParameters>;

  constructor(parameters: msdyn_FetchAllPredictionModelsRequestParameters) {
    super("msdyn_FetchAllPredictionModels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchAllPredictionModels`;

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

  async parseResponse(response: Response): Promise<msdyn_FetchAllPredictionModelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FetchAllPredictionModelsResponse.fromResponse({});
    return msdyn_FetchAllPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FetchAllPredictionModels response message
 */
export class msdyn_FetchAllPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchAllPredictionModelsResponseData) {
    super("msdyn_FetchAllPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_FetchAllPredictionModelsResponse {
    return new msdyn_FetchAllPredictionModelsResponse(
      responseObject<msdyn_FetchAllPredictionModelsResponseData>(data)
    );
  }
}
