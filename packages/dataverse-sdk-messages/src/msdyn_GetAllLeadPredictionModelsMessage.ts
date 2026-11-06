import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAllLeadPredictionModelsResponse as msdyn_GetAllLeadPredictionModelsResponseData } from "./types/index.js";

/**
 * msdyn_GetAllLeadPredictionModels request message
 *
 * Web API Action: msdyn_GetAllLeadPredictionModels
 */
export class msdyn_GetAllLeadPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllLeadPredictionModelsResponse>
{
  constructor() {
    super("msdyn_GetAllLeadPredictionModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllLeadPredictionModels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAllLeadPredictionModelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAllLeadPredictionModelsResponse.fromResponse({});
    return msdyn_GetAllLeadPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAllLeadPredictionModels response message
 */
export class msdyn_GetAllLeadPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllLeadPredictionModelsResponseData) {
    super("msdyn_GetAllLeadPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_GetAllLeadPredictionModelsResponse {
    return new msdyn_GetAllLeadPredictionModelsResponse(
      responseObject<msdyn_GetAllLeadPredictionModelsResponseData>(data)
    );
  }
}
