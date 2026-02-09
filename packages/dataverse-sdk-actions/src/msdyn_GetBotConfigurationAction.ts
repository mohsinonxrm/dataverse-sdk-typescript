import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_GetBotConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetBotConfigurationAction implements Executable<msdyn_GetBotConfigurationResponse> {
  constructor(public readonly botApplicationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBotConfiguration`;

    const body: Record<string, unknown> = {
      BotApplicationId: this.botApplicationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetBotConfigurationResponse> {
    const data = await response.json();
    return data as msdyn_GetBotConfigurationResponse;
  }
}
