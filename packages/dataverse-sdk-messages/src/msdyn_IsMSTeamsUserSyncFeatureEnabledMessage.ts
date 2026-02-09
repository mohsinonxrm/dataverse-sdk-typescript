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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsMSTeamsUserSyncFeatureEnabledResponse> {
    const data = await response.json();
    return msdyn_IsMSTeamsUserSyncFeatureEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_IsMSTeamsUserSyncFeatureEnabled response message
 */
export class msdyn_IsMSTeamsUserSyncFeatureEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsMSTeamsUserSyncFeatureEnabledResponse) {
    super("msdyn_IsMSTeamsUserSyncFeatureEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsMSTeamsUserSyncFeatureEnabledResponse {
    return new msdyn_IsMSTeamsUserSyncFeatureEnabledResponse((data as any).value);
  }
}
