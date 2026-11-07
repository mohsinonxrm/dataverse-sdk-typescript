import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * RetrieveFeatureControlStringSettings request message
 *
 * Web API Action: RetrieveFeatureControlStringSettings
 */
export class RetrieveFeatureControlStringSettingsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlStringSettingsResponse>
{
  constructor() {
    super("RetrieveFeatureControlStringSettings");
  }

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
    return RetrieveFeatureControlStringSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFeatureControlStringSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlStringSettingsResult {
  "@odata.context"?: string;
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * RetrieveFeatureControlStringSettings response message
 *
 * `result` is the value the RetrieveFeatureControlStringSettings action returns (see {@link RetrieveFeatureControlStringSettingsResult}).
 */
export class RetrieveFeatureControlStringSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlStringSettingsResult) {
    super("RetrieveFeatureControlStringSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFeatureControlStringSettingsResponse {
    return new RetrieveFeatureControlStringSettingsResponse(
      data as RetrieveFeatureControlStringSettingsResult
    );
  }
}
