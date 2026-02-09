import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * CloneMobileOfflineProfile request message
 *
 * Web API Action: CloneMobileOfflineProfile
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CloneMobileOfflineProfileResponse> {
    const data = await response.json();
    return CloneMobileOfflineProfileResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.mobileofflineprofileId,
    };
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
    return new CloneMobileOfflineProfileResponse((data as any).value);
  }
}
