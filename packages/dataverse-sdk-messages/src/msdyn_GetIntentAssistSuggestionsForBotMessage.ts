import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetIntentAssistSuggestionsForBotResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetIntentAssistSuggestionsForBot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIntentAssistSuggestionsForBotResult {
  "@odata.context"?: string;
  IntentAssistForBotResponse: string;
}

/**
 * msdyn_GetIntentAssistSuggestionsForBot response message
 *
 * `result` is the value the msdyn_GetIntentAssistSuggestionsForBot action returns (see {@link msdyn_GetIntentAssistSuggestionsForBotResult}).
 */
export class msdyn_GetIntentAssistSuggestionsForBotResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIntentAssistSuggestionsForBotResult) {
    super("msdyn_GetIntentAssistSuggestionsForBot");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetIntentAssistSuggestionsForBotResponse {
    return new msdyn_GetIntentAssistSuggestionsForBotResponse(
      data as msdyn_GetIntentAssistSuggestionsForBotResult
    );
  }
}
