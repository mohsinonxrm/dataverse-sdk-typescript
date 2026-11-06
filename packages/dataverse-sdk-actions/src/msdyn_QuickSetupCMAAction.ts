import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_QuickSetupCMA action
 */
export interface msdyn_QuickSetupCMAResponse {
  FieldsForPrediction: string;
  SettingsLink: string;
}

/**
 * Parameters of the msdyn_QuickSetupCMA action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QuickSetupCMAActionParameters {
  BotConversationId?: string;
  Fields: string;
}

/**
 * msdyn_QuickSetupCMA action
 *
 * Unbound action
 */
export class msdyn_QuickSetupCMAAction implements Executable<msdyn_QuickSetupCMAResponse> {
  constructor(public readonly parameters: msdyn_QuickSetupCMAActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QuickSetupCMA`;

    const body = requestBody({
      BotConversationId: this.parameters.BotConversationId,
      Fields: this.parameters.Fields,
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

  async parseResponse(response: Response): Promise<msdyn_QuickSetupCMAResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_QuickSetupCMAResponse;
    return (await response.json()) as msdyn_QuickSetupCMAResponse;
  }
}
