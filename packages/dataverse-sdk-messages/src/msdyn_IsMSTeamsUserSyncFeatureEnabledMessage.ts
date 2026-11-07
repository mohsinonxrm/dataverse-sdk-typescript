import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_IsMSTeamsUserSyncFeatureEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IsMSTeamsUserSyncFeatureEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsMSTeamsUserSyncFeatureEnabledResult {
  "@odata.context"?: string;
  DisabledReason: string;
  IsEnabled: boolean;
}

/**
 * msdyn_IsMSTeamsUserSyncFeatureEnabled response message
 *
 * `result` is the value the msdyn_IsMSTeamsUserSyncFeatureEnabled action returns (see {@link msdyn_IsMSTeamsUserSyncFeatureEnabledResult}).
 */
export class msdyn_IsMSTeamsUserSyncFeatureEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsMSTeamsUserSyncFeatureEnabledResult) {
    super("msdyn_IsMSTeamsUserSyncFeatureEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IsMSTeamsUserSyncFeatureEnabledResponse {
    return new msdyn_IsMSTeamsUserSyncFeatureEnabledResponse(
      data as msdyn_IsMSTeamsUserSyncFeatureEnabledResult
    );
  }
}
