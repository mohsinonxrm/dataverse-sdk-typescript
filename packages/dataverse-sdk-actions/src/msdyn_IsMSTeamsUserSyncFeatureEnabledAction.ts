import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsMSTeamsUserSyncFeatureEnabled action
 */
export interface msdyn_IsMSTeamsUserSyncFeatureEnabledResponse {
  IsEnabled: boolean;
  DisabledReason: string;
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
    const data = await response.json();
    return data as msdyn_IsMSTeamsUserSyncFeatureEnabledResponse;
  }
}
