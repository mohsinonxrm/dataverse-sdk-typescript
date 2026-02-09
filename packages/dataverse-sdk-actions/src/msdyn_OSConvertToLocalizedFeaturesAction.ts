import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSConvertToLocalizedFeatures action
 */
export interface msdyn_OSConvertToLocalizedFeaturesResponse {
  FeatureList: string;
}

/**
 * msdyn_OSConvertToLocalizedFeatures action
 *
 * Unbound action
 */
export class msdyn_OSConvertToLocalizedFeaturesAction implements Executable<msdyn_OSConvertToLocalizedFeaturesResponse> {
  constructor(public readonly predictionFeatures: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSConvertToLocalizedFeatures`;

    const body: Record<string, unknown> = {
      PredictionFeatures: this.predictionFeatures,
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

  async parseResponse(response: Response): Promise<msdyn_OSConvertToLocalizedFeaturesResponse> {
    const data = await response.json();
    return data as msdyn_OSConvertToLocalizedFeaturesResponse;
  }
}
