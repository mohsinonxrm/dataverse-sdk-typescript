import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckGeolocationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckGeolocationEnabledResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckGeolocationEnabledResponse;
  }
}
