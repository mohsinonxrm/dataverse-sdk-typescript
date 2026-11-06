import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_MobileAppBuild action
 */
export interface msdyn_MobileAppBuildResponse {
  Result: string;
}

/**
 * msdyn_MobileAppBuild action
 *
 * Unbound action
 */
export class msdyn_MobileAppBuildAction implements Executable<msdyn_MobileAppBuildResponse> {
  constructor(
    public readonly msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>,
    public readonly appCenterApiToken?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuild`;

    const body: Record<string, unknown> = {
      msdyn_MobileApp: this.msdyn_MobileApp,
      AppCenterApiToken: this.appCenterApiToken,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MobileAppBuildResponse> {
    const data = await response.json();
    return data as msdyn_MobileAppBuildResponse;
  }
}
