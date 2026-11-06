import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OSGetTrainingResultsResponse as msdyn_OSGetTrainingResultsResponseData } from "./types/index.js";

/**
 * msdyn_OSGetTrainingResults request message
 *
 * Web API Action: msdyn_OSGetTrainingResults
 */
export class msdyn_OSGetTrainingResultsRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetTrainingResultsResponse>
{
  constructor(public predictionName: string) {
    super("msdyn_OSGetTrainingResults");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetTrainingResults`;

    const body: Record<string, unknown> = {
      PredictionName: this.predictionName,
    };

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
    const data = await response.json();
    return msdyn_OSGetTrainingResultsResponse.fromResponse(data);
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
