import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MigrateRICommonRSA action
 */
export interface msdyn_MigrateRICommonRSAResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_MigrateRICommonRSA action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateRICommonRSAActionParameters {
  InputData: string;
}

/**
 * msdyn_MigrateRICommonRSA action
 *
 * Unbound action
 */
export class msdyn_MigrateRICommonRSAAction implements Executable<msdyn_MigrateRICommonRSAResponse> {
  constructor(public readonly parameters: msdyn_MigrateRICommonRSAActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateRICommonRSA`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateRICommonRSAResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_MigrateRICommonRSAResponse;
  }
}
