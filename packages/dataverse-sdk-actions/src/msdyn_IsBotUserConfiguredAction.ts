import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsBotUserConfigured action
 */
export interface msdyn_IsBotUserConfiguredResponse {
  IsConfigurationValid: boolean;
}

/**
 * msdyn_IsBotUserConfigured action
 *
 * Unbound action
 */
export class msdyn_IsBotUserConfiguredAction implements Executable<msdyn_IsBotUserConfiguredResponse> {
  constructor(public readonly botApplicationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsBotUserConfigured`;

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

  async parseResponse(response: Response): Promise<msdyn_IsBotUserConfiguredResponse> {
    const data = await response.json();
    return data as msdyn_IsBotUserConfiguredResponse;
  }
}
