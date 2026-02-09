import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DisableBotUser action
 */
export interface msdyn_DisableBotUserResponse {
  // No content returned
}

/**
 * msdyn_DisableBotUser action
 *
 * Unbound action
 */
export class msdyn_DisableBotUserAction implements Executable<msdyn_DisableBotUserResponse> {
  constructor(public readonly botApplicationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisableBotUser`;

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

  async parseResponse(response: Response): Promise<msdyn_DisableBotUserResponse> {
    // No return value (204 No Content)
    return {};
  }
}
