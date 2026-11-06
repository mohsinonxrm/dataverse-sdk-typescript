import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetCecCompatibilityForOmniChannel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCecCompatibilityForOmniChannelResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCecCompatibilityForOmniChannelResponse;
  }
}
