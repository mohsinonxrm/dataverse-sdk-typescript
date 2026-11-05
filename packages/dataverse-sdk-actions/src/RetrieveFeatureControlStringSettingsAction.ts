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
    const data = await response.json();
    return data as RetrieveFeatureControlStringSettingsResponse;
  }
}
