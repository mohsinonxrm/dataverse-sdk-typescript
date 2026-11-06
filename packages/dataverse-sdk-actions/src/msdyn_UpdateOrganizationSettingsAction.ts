import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateOrganizationSettings action
 */
export interface msdyn_UpdateOrganizationSettingsResponse {
  SettingsLink: string;
}

/**
 * Parameters of the msdyn_UpdateOrganizationSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateOrganizationSettingsActionParameters {
  BotConversationId?: string;
  UniqueName: string;
  Value: string;
}

/**
 * msdyn_UpdateOrganizationSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateOrganizationSettingsAction implements Executable<msdyn_UpdateOrganizationSettingsResponse> {
  constructor(public readonly parameters: msdyn_UpdateOrganizationSettingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateOrganizationSettings`;

    const body = requestBody({
      BotConversationId: this.parameters.BotConversationId,
      UniqueName: this.parameters.UniqueName,
      Value: this.parameters.Value,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateOrganizationSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateOrganizationSettingsResponse;
    return (await response.json()) as msdyn_UpdateOrganizationSettingsResponse;
  }
}
