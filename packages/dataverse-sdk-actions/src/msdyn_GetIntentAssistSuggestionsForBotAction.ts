import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetIntentAssistSuggestionsForBot action
 */
export interface msdyn_GetIntentAssistSuggestionsForBotResponse {
  IntentAssistForBotResponse: string;
}

/**
 * msdyn_GetIntentAssistSuggestionsForBot action
 *
 * Unbound action
 */
export class msdyn_GetIntentAssistSuggestionsForBotAction implements Executable<msdyn_GetIntentAssistSuggestionsForBotResponse> {
  constructor(
    public readonly slot__conversation: string[],
    public readonly intentAssistForBotRequest: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIntentAssistSuggestionsForBot`;

    const body: Record<string, unknown> = {
      slot__conversation: this.slot__conversation,
      IntentAssistForBotRequest: this.intentAssistForBotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetIntentAssistSuggestionsForBotResponse> {
    const data = await response.json();
    return data as msdyn_GetIntentAssistSuggestionsForBotResponse;
  }
}
