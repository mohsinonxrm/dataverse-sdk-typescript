import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCecCompatibilityForOmniChannel action
 */
export interface msdyn_GetCecCompatibilityForOmniChannelResponse {
  IsResolvedLegacyCommand: boolean;
}

/**
 * msdyn_GetCecCompatibilityForOmniChannel action
 *
 * Unbound action
 */
export class msdyn_GetCecCompatibilityForOmniChannelAction implements Executable<msdyn_GetCecCompatibilityForOmniChannelResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCecCompatibilityForOmniChannel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetCecCompatibilityForOmniChannelResponse> {
    const data = await response.json();
    return data as msdyn_GetCecCompatibilityForOmniChannelResponse;
  }
}
