import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * Response from CloneMobileOfflineProfile action
 */
export interface CloneMobileOfflineProfileResponse {
  value: mobileofflineprofile;
}

/**
 * CloneMobileOfflineProfile action
 *
 * Bound action
 * Binding parameter: entity (mscrm.mobileofflineprofile)
 */
export class CloneMobileOfflineProfileAction implements Executable<CloneMobileOfflineProfileResponse> {
  constructor(public readonly mobileofflineprofileId: string) {}

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
    return data as CloneMobileOfflineProfileResponse;
  }
}
