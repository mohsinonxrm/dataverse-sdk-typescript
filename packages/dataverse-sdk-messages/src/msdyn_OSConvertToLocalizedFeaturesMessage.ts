import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OSConvertToLocalizedFeaturesResponse as msdyn_OSConvertToLocalizedFeaturesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OSConvertToLocalizedFeatures message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSConvertToLocalizedFeaturesRequestParameters {
  PredictionFeatures?: string;
}

/**
 * msdyn_OSConvertToLocalizedFeatures request message
 *
 * Web API Action: msdyn_OSConvertToLocalizedFeatures
 */
export class msdyn_OSConvertToLocalizedFeaturesRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSConvertToLocalizedFeaturesResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSConvertToLocalizedFeaturesRequestParameters>;

  constructor(parameters: msdyn_OSConvertToLocalizedFeaturesRequestParameters = {}) {
    super("msdyn_OSConvertToLocalizedFeatures", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSConvertToLocalizedFeatures`;

    const body = requestBody({
      PredictionFeatures: this.Parameters.PredictionFeatures,
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

  async parseResponse(response: Response): Promise<msdyn_OSConvertToLocalizedFeaturesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OSConvertToLocalizedFeaturesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_OSConvertToLocalizedFeatures response message
 */
export class msdyn_OSConvertToLocalizedFeaturesResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSConvertToLocalizedFeaturesResponseData) {
    super("msdyn_OSConvertToLocalizedFeatures");
  }

  static fromResponse(data: unknown): msdyn_OSConvertToLocalizedFeaturesResponse {
    return new msdyn_OSConvertToLocalizedFeaturesResponse(
      responseObject<msdyn_OSConvertToLocalizedFeaturesResponseData>(data)
    );
  }
}
