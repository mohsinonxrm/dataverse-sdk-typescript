import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from the RetrieveFeatureControlStringSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlStringSettingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFeatureControlStringSettingsResponse;
  }
}
