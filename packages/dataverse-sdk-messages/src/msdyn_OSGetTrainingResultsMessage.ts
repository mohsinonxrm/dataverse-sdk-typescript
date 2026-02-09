import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OSGetTrainingResultsResponse> {
    const data = await response.json();
    return msdyn_OSGetTrainingResultsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionName: this.predictionName,
    };
  }
}

/**
 * msdyn_OSGetTrainingResults response message
 */
export class msdyn_OSGetTrainingResultsResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetTrainingResultsResponse) {
    super("msdyn_OSGetTrainingResults");
  }

  static fromResponse(data: unknown): msdyn_OSGetTrainingResultsResponse {
    return new msdyn_OSGetTrainingResultsResponse((data as any).value);
  }
}
