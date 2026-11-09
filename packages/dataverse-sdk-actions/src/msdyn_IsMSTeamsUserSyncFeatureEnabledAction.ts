import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IsMSTeamsUserSyncFeatureEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsMSTeamsUserSyncFeatureEnabledResponse {
  "@odata.context"?: string;
  DisabledReason: string;
  IsEnabled: boolean;
}

/**
 * msdyn_IsMSTeamsUserSyncFeatureEnabled action
 *
 * Unbound action
 */
export class msdyn_IsMSTeamsUserSyncFeatureEnabledAction implements Executable<msdyn_IsMSTeamsUserSyncFeatureEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsMSTeamsUserSyncFeatureEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsMSTeamsUserSyncFeatureEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IsMSTeamsUserSyncFeatureEnabledResponse;
  }
}
