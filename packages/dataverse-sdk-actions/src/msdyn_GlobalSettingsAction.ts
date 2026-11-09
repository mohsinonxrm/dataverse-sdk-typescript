import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GlobalSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GlobalSettingsResponse {
  "@odata.context"?: string;
  SettingsLink: string;
}

/**
 * Parameters of the msdyn_GlobalSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GlobalSettingsActionParameters {
  BotConversationId?: string;
}

/**
 * msdyn_GlobalSettings action
 *
 * Unbound action
 */
export class msdyn_GlobalSettingsAction implements Executable<msdyn_GlobalSettingsResponse> {
  constructor(public readonly parameters: msdyn_GlobalSettingsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GlobalSettings`;

    const body = requestBody({
      BotConversationId: this.parameters.BotConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_GlobalSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GlobalSettingsResponse;
  }
}
