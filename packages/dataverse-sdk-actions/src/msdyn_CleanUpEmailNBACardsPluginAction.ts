import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CleanUpEmailNBACardsPlugin action
 */
export interface msdyn_CleanUpEmailNBACardsPluginResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CleanUpEmailNBACardsPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanUpEmailNBACardsPluginActionParameters {
  InputData?: string;
}

/**
 * msdyn_CleanUpEmailNBACardsPlugin action
 *
 * Unbound action
 */
export class msdyn_CleanUpEmailNBACardsPluginAction implements Executable<msdyn_CleanUpEmailNBACardsPluginResponse> {
  constructor(public readonly parameters: msdyn_CleanUpEmailNBACardsPluginActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpEmailNBACardsPlugin`;

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

  async parseResponse(response: Response): Promise<msdyn_CleanUpEmailNBACardsPluginResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CleanUpEmailNBACardsPluginResponse;
  }
}
