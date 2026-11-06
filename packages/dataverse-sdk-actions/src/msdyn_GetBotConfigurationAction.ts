import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetBotConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetBotConfigurationResponse {
  "@odata.context"?: string;
  ConfigRelativeUrl: string;
  ConfigurationState: number;
  ErrorCode: number;
  ErrorDescription: string;
  IsConfigured: boolean;
  RecordId: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetBotConfigurationResponse;
  }
}
