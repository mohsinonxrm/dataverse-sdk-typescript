import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConvertToLocalizedFeaturesResponse as msdyn_ConvertToLocalizedFeaturesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ConvertToLocalizedFeatures message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertToLocalizedFeaturesRequestParameters {
  PredictionFeatures?: string;
}

/**
 * msdyn_ConvertToLocalizedFeatures request message
 *
 * Web API Action: msdyn_ConvertToLocalizedFeatures
 */
export class msdyn_ConvertToLocalizedFeaturesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertToLocalizedFeaturesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertToLocalizedFeaturesRequestParameters>;

  constructor(parameters: msdyn_ConvertToLocalizedFeaturesRequestParameters = {}) {
    super("msdyn_ConvertToLocalizedFeatures", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertToLocalizedFeatures`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertToLocalizedFeaturesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ConvertToLocalizedFeaturesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ConvertToLocalizedFeatures response message
 */
export class msdyn_ConvertToLocalizedFeaturesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertToLocalizedFeaturesResponseData) {
    super("msdyn_ConvertToLocalizedFeatures");
  }

  static fromResponse(data: unknown): msdyn_ConvertToLocalizedFeaturesResponse {
    return new msdyn_ConvertToLocalizedFeaturesResponse(
      responseObject<msdyn_ConvertToLocalizedFeaturesResponseData>(data)
    );
  }
}
