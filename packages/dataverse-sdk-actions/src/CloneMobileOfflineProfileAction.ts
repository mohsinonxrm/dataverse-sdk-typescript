import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * Response from CloneMobileOfflineProfile action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CloneMobileOfflineProfileResponse extends mobileofflineprofile {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CloneMobileOfflineProfile action
 *
 * Bound action
 * Binding parameter: entity (mscrm.mobileofflineprofile)
 *
 * The first argument is the id of the mobileofflineprofile record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CloneMobileOfflineProfileResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CloneMobileOfflineProfileResponse;
    return (await response.json()) as CloneMobileOfflineProfileResponse;
  }
}
