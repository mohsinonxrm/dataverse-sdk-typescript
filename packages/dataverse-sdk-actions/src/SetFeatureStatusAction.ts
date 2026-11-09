import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SetFeatureStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SetFeatureStatusResponse = void;

/**
 * Parameters of the SetFeatureStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetFeatureStatusActionParameters {
  FeatureType: number;
  Status: boolean;
  ConfigData?: string;
  IsSolutionUninstall?: boolean;
}

/**
 * SetFeatureStatus action
 *
 * Unbound action
 */
export class SetFeatureStatusAction implements Executable<SetFeatureStatusResponse> {
  constructor(public readonly parameters: SetFeatureStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetFeatureStatus`;

    const body = requestBody({
      FeatureType: this.parameters.FeatureType,
      Status: this.parameters.Status,
      ConfigData: this.parameters.ConfigData,
      IsSolutionUninstall: this.parameters.IsSolutionUninstall,
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

  parseResponse(_response: Response): Promise<SetFeatureStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
