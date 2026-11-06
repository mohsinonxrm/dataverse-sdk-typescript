import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CloneMobileOfflineProfileResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CloneMobileOfflineProfileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CloneMobileOfflineProfile action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CloneMobileOfflineProfileResult =
  | (mobileofflineprofile & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * CloneMobileOfflineProfile response message
 *
 * `result` is the value the CloneMobileOfflineProfile action returns (see {@link CloneMobileOfflineProfileResult}).
 */
export class CloneMobileOfflineProfileResponse extends OrganizationResponse {
  constructor(public result: CloneMobileOfflineProfileResult) {
    super("CloneMobileOfflineProfile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CloneMobileOfflineProfileResponse {
    return new CloneMobileOfflineProfileResponse((data ?? null) as CloneMobileOfflineProfileResult);
  }
}
