import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SetFeatureStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SetFeatureStatusResponse = void;

/**
 * Parameters of the msdyn_SetFeatureStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetFeatureStatusActionParameters {
  FeatureType?: number;
  Status?: boolean;
  IsSolutionUninstall?: boolean;
  ConfigurationData?: string;
}

/**
 * msdyn_SetFeatureStatus action
 *
 * Unbound action
 */
export class msdyn_SetFeatureStatusAction implements Executable<msdyn_SetFeatureStatusResponse> {
  constructor(public readonly parameters: msdyn_SetFeatureStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetFeatureStatus`;

    const body = requestBody({
      FeatureType: this.parameters.FeatureType,
      Status: this.parameters.Status,
      IsSolutionUninstall: this.parameters.IsSolutionUninstall,
      ConfigurationData: this.parameters.ConfigurationData,
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

  parseResponse(_response: Response): Promise<msdyn_SetFeatureStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
