import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetPredictionModelStatusResponse as msdyn_GetPredictionModelStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetPredictionModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPredictionModelStatusRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_GetPredictionModelStatus request message
 *
 * Web API Action: msdyn_GetPredictionModelStatus
 */
export class msdyn_GetPredictionModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPredictionModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetPredictionModelStatusRequestParameters>;

  constructor(parameters: msdyn_GetPredictionModelStatusRequestParameters = {}) {
    super("msdyn_GetPredictionModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetPredictionModelStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetPredictionModelStatusResponse.fromResponse(text ? JSON.parse(text) : {});
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
