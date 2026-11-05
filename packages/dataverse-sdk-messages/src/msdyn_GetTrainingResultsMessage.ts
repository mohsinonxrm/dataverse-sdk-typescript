import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetTrainingResults request message
 *
 * Web API Action: msdyn_GetTrainingResults
 */
export class msdyn_GetTrainingResultsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTrainingResultsResponse>
{
  constructor(public predictionName: string) {
    super("msdyn_GetTrainingResults");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTrainingResults`;

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

  async parseResponse(response: Response): Promise<msdyn_GetTrainingResultsResponse> {
    const data = await response.json();
    return msdyn_GetTrainingResultsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionName: this.predictionName,
    };
  }
}

/**
 * msdyn_GetTrainingResults response message
 */
export class msdyn_GetTrainingResultsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTrainingResultsResponse) {
    super("msdyn_GetTrainingResults");
  }

  static fromResponse(data: unknown): msdyn_GetTrainingResultsResponse {
    return new msdyn_GetTrainingResultsResponse((data as any).value);
  }
}
