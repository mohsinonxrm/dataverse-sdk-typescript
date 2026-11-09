import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateFeatureConfig action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateFeatureConfigResponse = void;

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

  parseResponse(_response: Response): Promise<UpdateFeatureConfigResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
