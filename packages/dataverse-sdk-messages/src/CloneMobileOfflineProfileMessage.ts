import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * CloneMobileOfflineProfile request message
 *
 * Web API Action: CloneMobileOfflineProfile
 *
 * The first argument is the id of the mobileofflineprofile record to call it on.
 */
export class CloneMobileOfflineProfileRequest
  extends OrganizationRequest
  implements Executable<CloneMobileOfflineProfileResponse>
{
  constructor(public mobileofflineprofileId: string) {
    super("CloneMobileOfflineProfile");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/mobileofflineprofiles(${this.mobileofflineprofileId})/Microsoft.Dynamics.CRM.CloneMobileOfflineProfile`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CloneMobileOfflineProfileResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CloneMobileOfflineProfileResponse.fromResponse({});
    return CloneMobileOfflineProfileResponse.fromResponse(await response.json());
  }
}

/**
 * CloneMobileOfflineProfile response message
 */
export class CloneMobileOfflineProfileResponse extends OrganizationResponse {
  constructor(public result: mobileofflineprofile) {
    super("CloneMobileOfflineProfile");
  }

  static fromResponse(data: unknown): CloneMobileOfflineProfileResponse {
    return new CloneMobileOfflineProfileResponse(responseObject<mobileofflineprofile>(data));
  }
}
