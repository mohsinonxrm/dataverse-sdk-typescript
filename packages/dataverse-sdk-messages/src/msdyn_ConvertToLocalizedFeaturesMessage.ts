import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ConvertToLocalizedFeatures request message
 *
 * Web API Action: msdyn_ConvertToLocalizedFeatures
 */
export class msdyn_ConvertToLocalizedFeaturesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertToLocalizedFeaturesResponse>
{
  constructor(public predictionFeatures: string) {
    super("msdyn_ConvertToLocalizedFeatures");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertToLocalizedFeatures`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertToLocalizedFeaturesResponse> {
    const data = await response.json();
    return msdyn_ConvertToLocalizedFeaturesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionFeatures: this.predictionFeatures,
    };
  }
}

/**
 * msdyn_ConvertToLocalizedFeatures response message
 */
export class msdyn_ConvertToLocalizedFeaturesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertToLocalizedFeaturesResponse) {
    super("msdyn_ConvertToLocalizedFeatures");
  }

  static fromResponse(data: unknown): msdyn_ConvertToLocalizedFeaturesResponse {
    return new msdyn_ConvertToLocalizedFeaturesResponse((data as any).value);
  }
}
