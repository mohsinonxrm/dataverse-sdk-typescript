import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAllAttributesDataResponse as msdyn_GetAllAttributesDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAllAttributesData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAllAttributesDataRequestParameters {
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_GetAllAttributesData request message
 *
 * Web API Action: msdyn_GetAllAttributesData
 */
export class msdyn_GetAllAttributesDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllAttributesDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAllAttributesDataRequestParameters>;

  constructor(parameters: msdyn_GetAllAttributesDataRequestParameters) {
    super("msdyn_GetAllAttributesData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllAttributesData`;

    const body = requestBody({
      PredictionName: this.Parameters.PredictionName,
      PredictionType: this.Parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAllAttributesDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAllAttributesDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetAllAttributesData response message
 */
export class msdyn_GetAllAttributesDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllAttributesDataResponseData) {
    super("msdyn_GetAllAttributesData");
  }

  static fromResponse(data: unknown): msdyn_GetAllAttributesDataResponse {
    return new msdyn_GetAllAttributesDataResponse(
      responseObject<msdyn_GetAllAttributesDataResponseData>(data)
    );
  }
}
