import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetIntentAssistSuggestionsForBotResponse as msdyn_GetIntentAssistSuggestionsForBotResponseData } from "./types/index.js";

/**
 * msdyn_GetIntentAssistSuggestionsForBot request message
 *
 * Web API Action: msdyn_GetIntentAssistSuggestionsForBot
 */
export class msdyn_GetIntentAssistSuggestionsForBotRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIntentAssistSuggestionsForBotResponse>
{
  constructor(
    public slot__conversation: string[],
    public intentAssistForBotRequest: string
  ) {
    super("msdyn_GetIntentAssistSuggestionsForBot");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetIntentAssistSuggestionsForBotResponse> {
    const data = await response.json();
    return msdyn_GetIntentAssistSuggestionsForBotResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetIntentAssistSuggestionsForBot response message
 */
export class msdyn_GetIntentAssistSuggestionsForBotResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIntentAssistSuggestionsForBotResponseData) {
    super("msdyn_GetIntentAssistSuggestionsForBot");
  }

  static fromResponse(data: unknown): msdyn_GetIntentAssistSuggestionsForBotResponse {
    return new msdyn_GetIntentAssistSuggestionsForBotResponse(
      responseObject<msdyn_GetIntentAssistSuggestionsForBotResponseData>(data)
    );
  }
}
