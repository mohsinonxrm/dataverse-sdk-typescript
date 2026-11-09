import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetIntentAssistSuggestionsForBot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIntentAssistSuggestionsForBotResponse {
  "@odata.context"?: string;
  IntentAssistForBotResponse: string;
}

/**
 * Parameters of the msdyn_GetIntentAssistSuggestionsForBot action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIntentAssistSuggestionsForBotActionParameters {
  slot__conversation?: string[];
  IntentAssistForBotRequest: string;
}

/**
 * msdyn_GetIntentAssistSuggestionsForBot action
 *
 * Unbound action
 */
export class msdyn_GetIntentAssistSuggestionsForBotAction implements Executable<msdyn_GetIntentAssistSuggestionsForBotResponse> {
  constructor(public readonly parameters: msdyn_GetIntentAssistSuggestionsForBotActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIntentAssistSuggestionsForBot`;

    const body = requestBody({
      slot__conversation: this.parameters.slot__conversation,
      IntentAssistForBotRequest: this.parameters.IntentAssistForBotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetIntentAssistSuggestionsForBotResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetIntentAssistSuggestionsForBotResponse;
  }
}
