import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConvertToLocalizedFeatures action
 */
export interface msdyn_ConvertToLocalizedFeaturesResponse {
  FeatureList: string;
}

/**
 * msdyn_ConvertToLocalizedFeatures action
 *
 * Unbound action
 */
export class msdyn_ConvertToLocalizedFeaturesAction implements Executable<msdyn_ConvertToLocalizedFeaturesResponse> {
  constructor(public readonly predictionFeatures: string) {}

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
    return data as msdyn_ConvertToLocalizedFeaturesResponse;
  }
}
