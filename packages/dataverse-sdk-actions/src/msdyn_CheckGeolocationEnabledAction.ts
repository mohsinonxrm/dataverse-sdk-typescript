import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckGeolocationEnabled action
 */
export interface msdyn_CheckGeolocationEnabledResponse {
  IsEnabled: boolean;
}

/**
 * Parameters of the msdyn_CheckGeolocationEnabled action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckGeolocationEnabledActionParameters {
  Version?: string;
  NoCache?: boolean;
}

/**
 * msdyn_CheckGeolocationEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckGeolocationEnabledAction implements Executable<msdyn_CheckGeolocationEnabledResponse> {
  constructor(public readonly parameters: msdyn_CheckGeolocationEnabledActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckGeolocationEnabled`;

    const body = requestBody({
      Version: this.parameters.Version,
      NoCache: this.parameters.NoCache,
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

  async parseResponse(response: Response): Promise<msdyn_CheckGeolocationEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckGeolocationEnabledResponse;
  }
}
