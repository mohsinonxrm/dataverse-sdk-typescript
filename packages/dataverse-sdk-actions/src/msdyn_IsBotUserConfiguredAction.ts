import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IsBotUserConfigured action
 */
export interface msdyn_IsBotUserConfiguredResponse {
  IsConfigurationValid: boolean;
}

/**
 * Parameters of the msdyn_IsBotUserConfigured action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IsBotUserConfiguredActionParameters {
  BotApplicationId: string;
}

/**
 * msdyn_IsBotUserConfigured action
 *
 * Unbound action
 */
export class msdyn_IsBotUserConfiguredAction implements Executable<msdyn_IsBotUserConfiguredResponse> {
  constructor(public readonly parameters: msdyn_IsBotUserConfiguredActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsBotUserConfigured`;

    const body = requestBody({
      BotApplicationId: this.parameters.BotApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_IsBotUserConfiguredResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IsBotUserConfiguredResponse;
  }
}
