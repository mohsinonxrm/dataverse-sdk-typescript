import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IsMSTeamsUserSyncFeatureEnabledResponse as msdyn_IsMSTeamsUserSyncFeatureEnabledResponseData } from "./types/index.js";

/**
 * msdyn_IsMSTeamsUserSyncFeatureEnabled request message
 *
 * Web API Action: msdyn_IsMSTeamsUserSyncFeatureEnabled
 */
export class msdyn_IsMSTeamsUserSyncFeatureEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsMSTeamsUserSyncFeatureEnabledResponse>
{
  constructor() {
    super("msdyn_IsMSTeamsUserSyncFeatureEnabled");
  }

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
    if (response.status === 204)
      return msdyn_IsMSTeamsUserSyncFeatureEnabledResponse.fromResponse({});
    return msdyn_IsMSTeamsUserSyncFeatureEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IsMSTeamsUserSyncFeatureEnabled response message
 */
export class msdyn_IsMSTeamsUserSyncFeatureEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsMSTeamsUserSyncFeatureEnabledResponseData) {
    super("msdyn_IsMSTeamsUserSyncFeatureEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsMSTeamsUserSyncFeatureEnabledResponse {
    return new msdyn_IsMSTeamsUserSyncFeatureEnabledResponse(
      responseObject<msdyn_IsMSTeamsUserSyncFeatureEnabledResponseData>(data)
    );
  }
}
