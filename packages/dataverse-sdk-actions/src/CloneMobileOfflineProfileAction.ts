import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * Response from the CloneMobileOfflineProfile action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CloneMobileOfflineProfileResponse =
  | (mobileofflineprofile & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as CloneMobileOfflineProfileResponse;
  }
}
