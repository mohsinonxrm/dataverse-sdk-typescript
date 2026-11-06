import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OSGetPredictionModelStatusResponse as msdyn_OSGetPredictionModelStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OSGetPredictionModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSGetPredictionModelStatusRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_OSGetPredictionModelStatus request message
 *
 * Web API Action: msdyn_OSGetPredictionModelStatus
 */
export class msdyn_OSGetPredictionModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetPredictionModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSGetPredictionModelStatusRequestParameters>;

  constructor(parameters: msdyn_OSGetPredictionModelStatusRequestParameters = {}) {
    super("msdyn_OSGetPredictionModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetPredictionModelStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OSGetPredictionModelStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_OSGetPredictionModelStatus response message
 */
export class msdyn_OSGetPredictionModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetPredictionModelStatusResponseData) {
    super("msdyn_OSGetPredictionModelStatus");
  }

  static fromResponse(data: unknown): msdyn_OSGetPredictionModelStatusResponse {
    return new msdyn_OSGetPredictionModelStatusResponse(
      responseObject<msdyn_OSGetPredictionModelStatusResponseData>(data)
    );
  }
}
