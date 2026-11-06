import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlStringSettings action
 */
export interface RetrieveFeatureControlStringSettingsResponse {
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * RetrieveFeatureControlStringSettings action
 *
 * Unbound action
 */
export class RetrieveFeatureControlStringSettingsAction implements Executable<RetrieveFeatureControlStringSettingsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlStringSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveFeatureControlStringSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveFeatureControlStringSettingsResponse;
    return (await response.json()) as RetrieveFeatureControlStringSettingsResponse;
  }
}
