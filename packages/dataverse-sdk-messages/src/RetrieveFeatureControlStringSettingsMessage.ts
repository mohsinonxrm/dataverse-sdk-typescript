import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RetrieveFeatureControlStringSettingsResponse as RetrieveFeatureControlStringSettingsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return RetrieveFeatureControlStringSettingsResponse.fromResponse({});
    return RetrieveFeatureControlStringSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * RetrieveFeatureControlStringSettings response message
 */
export class RetrieveFeatureControlStringSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlStringSettingsResponseData) {
    super("RetrieveFeatureControlStringSettings");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlStringSettingsResponse {
    return new RetrieveFeatureControlStringSettingsResponse(
      responseObject<RetrieveFeatureControlStringSettingsResponseData>(data)
    );
  }
}
