import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetTrainingResultsResponse as msdyn_GetTrainingResultsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetTrainingResults message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTrainingResultsRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_GetTrainingResults request message
 *
 * Web API Action: msdyn_GetTrainingResults
 */
export class msdyn_GetTrainingResultsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTrainingResultsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetTrainingResultsRequestParameters>;

  constructor(parameters: msdyn_GetTrainingResultsRequestParameters = {}) {
    super("msdyn_GetTrainingResults", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTrainingResults`;

    const body = requestBody({
      PredictionName: this.Parameters.PredictionName,
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

  async parseResponse(response: Response): Promise<msdyn_GetTrainingResultsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetTrainingResultsResponse.fromResponse({});
    return msdyn_GetTrainingResultsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetTrainingResults response message
 */
export class msdyn_GetTrainingResultsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTrainingResultsResponseData) {
    super("msdyn_GetTrainingResults");
  }

  static fromResponse(data: unknown): msdyn_GetTrainingResultsResponse {
    return new msdyn_GetTrainingResultsResponse(
      responseObject<msdyn_GetTrainingResultsResponseData>(data)
    );
  }
}
