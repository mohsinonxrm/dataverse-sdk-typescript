import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OSGetTrainingResultsResponse as msdyn_OSGetTrainingResultsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OSGetTrainingResults message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSGetTrainingResultsRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_OSGetTrainingResults request message
 *
 * Web API Action: msdyn_OSGetTrainingResults
 */
export class msdyn_OSGetTrainingResultsRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetTrainingResultsResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSGetTrainingResultsRequestParameters>;

  constructor(parameters: msdyn_OSGetTrainingResultsRequestParameters = {}) {
    super("msdyn_OSGetTrainingResults", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetTrainingResults`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetTrainingResultsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_OSGetTrainingResultsResponse.fromResponse({});
    return msdyn_OSGetTrainingResultsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_OSGetTrainingResults response message
 */
export class msdyn_OSGetTrainingResultsResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetTrainingResultsResponseData) {
    super("msdyn_OSGetTrainingResults");
  }

  static fromResponse(data: unknown): msdyn_OSGetTrainingResultsResponse {
    return new msdyn_OSGetTrainingResultsResponse(
      responseObject<msdyn_OSGetTrainingResultsResponseData>(data)
    );
  }
}
