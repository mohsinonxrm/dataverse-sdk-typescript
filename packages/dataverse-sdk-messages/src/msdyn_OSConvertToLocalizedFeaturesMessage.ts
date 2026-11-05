import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OSConvertToLocalizedFeaturesResponse as msdyn_OSConvertToLocalizedFeaturesResponseData } from "./types/index.js";

/**
 * msdyn_OSConvertToLocalizedFeatures request message
 *
 * Web API Action: msdyn_OSConvertToLocalizedFeatures
 */
export class msdyn_OSConvertToLocalizedFeaturesRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSConvertToLocalizedFeaturesResponse>
{
  constructor(public predictionFeatures: string) {
    super("msdyn_OSConvertToLocalizedFeatures");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSConvertToLocalizedFeatures`;

    const body: Record<string, unknown> = {
      PredictionFeatures: this.predictionFeatures,
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

  async parseResponse(response: Response): Promise<msdyn_OSConvertToLocalizedFeaturesResponse> {
    const data = await response.json();
    return msdyn_OSConvertToLocalizedFeaturesResponse.fromResponse(data);
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
