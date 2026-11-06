import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetPredictionModelStatusResponse as msdyn_GetPredictionModelStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetPredictionModelStatus request message
 *
 * Web API Action: msdyn_GetPredictionModelStatus
 */
export class msdyn_GetPredictionModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPredictionModelStatusResponse>
{
  constructor(public predictionName?: string) {
    super("msdyn_GetPredictionModelStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetPredictionModelStatusResponse> {
    const data = await response.json();
    return msdyn_GetPredictionModelStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetPredictionModelStatus response message
 */
export class msdyn_GetPredictionModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPredictionModelStatusResponseData) {
    super("msdyn_GetPredictionModelStatus");
  }

  static fromResponse(data: unknown): msdyn_GetPredictionModelStatusResponse {
    return new msdyn_GetPredictionModelStatusResponse(
      responseObject<msdyn_GetPredictionModelStatusResponseData>(data)
    );
  }
}
