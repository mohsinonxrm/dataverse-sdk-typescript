import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ConvertToLocalizedFeatures action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertToLocalizedFeaturesResponse {
  "@odata.context"?: string;
  FeatureList: string;
}

/**
 * Parameters of the msdyn_ConvertToLocalizedFeatures action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertToLocalizedFeaturesActionParameters {
  PredictionFeatures?: string;
}

/**
 * msdyn_ConvertToLocalizedFeatures action
 *
 * Unbound action
 */
export class msdyn_ConvertToLocalizedFeaturesAction implements Executable<msdyn_ConvertToLocalizedFeaturesResponse> {
  constructor(public readonly parameters: msdyn_ConvertToLocalizedFeaturesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertToLocalizedFeatures`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertToLocalizedFeaturesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ConvertToLocalizedFeaturesResponse;
  }
}
