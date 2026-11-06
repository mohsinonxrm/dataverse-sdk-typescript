import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SetFeatureStatus action
 */
export interface SetFeatureStatusResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<SetFeatureStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SetFeatureStatusResponse;
    return (await response.json()) as SetFeatureStatusResponse;
  }
}
