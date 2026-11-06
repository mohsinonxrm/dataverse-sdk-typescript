import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetBotConfiguration action
 */
export interface msdyn_GetBotConfigurationResponse {
  IsConfigured: boolean;
  RecordId: string;
  ConfigRelativeUrl: string;
  ErrorCode: number;
  ErrorDescription: string;
  ConfigurationState: number;
}

/**
 * Parameters of the msdyn_GetBotConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBotConfigurationActionParameters {
  BotApplicationId: string;
}

/**
 * msdyn_GetBotConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetBotConfigurationAction implements Executable<msdyn_GetBotConfigurationResponse> {
  constructor(public readonly parameters: msdyn_GetBotConfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBotConfiguration`;

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

  async parseResponse(response: Response): Promise<msdyn_GetBotConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetBotConfigurationResponse;
  }
}
