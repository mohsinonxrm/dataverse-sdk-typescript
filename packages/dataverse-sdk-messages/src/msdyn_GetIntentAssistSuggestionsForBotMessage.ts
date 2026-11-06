import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetIntentAssistSuggestionsForBotResponse as msdyn_GetIntentAssistSuggestionsForBotResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetIntentAssistSuggestionsForBot message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIntentAssistSuggestionsForBotRequestParameters {
  slot__conversation?: string[];
  IntentAssistForBotRequest: string;
}

/**
 * msdyn_GetIntentAssistSuggestionsForBot request message
 *
 * Web API Action: msdyn_GetIntentAssistSuggestionsForBot
 */
export class msdyn_GetIntentAssistSuggestionsForBotRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIntentAssistSuggestionsForBotResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetIntentAssistSuggestionsForBotRequestParameters>;

  constructor(parameters: msdyn_GetIntentAssistSuggestionsForBotRequestParameters) {
    super("msdyn_GetIntentAssistSuggestionsForBot", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIntentAssistSuggestionsForBot`;

    const body = requestBody({
      slot__conversation: this.Parameters.slot__conversation,
      IntentAssistForBotRequest: this.Parameters.IntentAssistForBotRequest,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetIntentAssistSuggestionsForBotResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
