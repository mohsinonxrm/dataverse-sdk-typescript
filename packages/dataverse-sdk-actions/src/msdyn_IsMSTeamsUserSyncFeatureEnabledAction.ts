import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsMSTeamsUserSyncFeatureEnabled action
 */
export interface msdyn_IsMSTeamsUserSyncFeatureEnabledResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IsMSTeamsUserSyncFeatureEnabledResponse;
    return (await response.json()) as msdyn_IsMSTeamsUserSyncFeatureEnabledResponse;
  }
}
