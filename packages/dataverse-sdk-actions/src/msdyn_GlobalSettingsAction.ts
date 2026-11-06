import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GlobalSettings action
 */
export interface msdyn_GlobalSettingsResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GlobalSettingsResponse;
    return (await response.json()) as msdyn_GlobalSettingsResponse;
  }
}
