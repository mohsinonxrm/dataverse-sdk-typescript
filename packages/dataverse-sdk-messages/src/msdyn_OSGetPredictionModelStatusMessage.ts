import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OSGetPredictionModelStatus request message
 *
 * Web API Action: msdyn_OSGetPredictionModelStatus
 */
export class msdyn_OSGetPredictionModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetPredictionModelStatusResponse>
{
  constructor(public predictionName: string) {
    super("msdyn_OSGetPredictionModelStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetPredictionModelStatusResponse> {
    const data = await response.json();
    return msdyn_OSGetPredictionModelStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionName: this.predictionName,
    };
  }
}

/**
 * msdyn_OSGetPredictionModelStatus response message
 */
export class msdyn_OSGetPredictionModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetPredictionModelStatusResponse) {
    super("msdyn_OSGetPredictionModelStatus");
  }

  static fromResponse(data: unknown): msdyn_OSGetPredictionModelStatusResponse {
    return new msdyn_OSGetPredictionModelStatusResponse((data as any).value);
  }
}
