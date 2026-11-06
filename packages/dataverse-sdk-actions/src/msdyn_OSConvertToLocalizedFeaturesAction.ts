import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OSConvertToLocalizedFeatures action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSConvertToLocalizedFeaturesResponse {
  "@odata.context"?: string;
  FeatureList: string;
}

/**
 * Parameters of the msdyn_OSConvertToLocalizedFeatures action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSConvertToLocalizedFeaturesActionParameters {
  PredictionFeatures?: string;
}

/**
 * msdyn_OSConvertToLocalizedFeatures action
 *
 * Unbound action
 */
export class msdyn_OSConvertToLocalizedFeaturesAction implements Executable<msdyn_OSConvertToLocalizedFeaturesResponse> {
  constructor(
    public readonly parameters: msdyn_OSConvertToLocalizedFeaturesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSConvertToLocalizedFeatures`;

    const body = requestBody({
      PredictionFeatures: this.parameters.PredictionFeatures,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OSConvertToLocalizedFeaturesResponse;
  }
}
