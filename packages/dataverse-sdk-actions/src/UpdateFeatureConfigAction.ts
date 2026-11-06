import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateFeatureConfig action
 */
export interface UpdateFeatureConfigResponse {
  // No content returned
}

/**
 * Parameters of the UpdateFeatureConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateFeatureConfigActionParameters {
  FeatureType: number;
  ConfigData: string;
}

/**
 * UpdateFeatureConfig action
 *
 * Unbound action
 */
export class UpdateFeatureConfigAction implements Executable<UpdateFeatureConfigResponse> {
  constructor(public readonly parameters: UpdateFeatureConfigActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateFeatureConfig`;

    const body = requestBody({
      FeatureType: this.parameters.FeatureType,
      ConfigData: this.parameters.ConfigData,
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

  async parseResponse(response: Response): Promise<UpdateFeatureConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UpdateFeatureConfigResponse;
    return (await response.json()) as UpdateFeatureConfigResponse;
  }
}
