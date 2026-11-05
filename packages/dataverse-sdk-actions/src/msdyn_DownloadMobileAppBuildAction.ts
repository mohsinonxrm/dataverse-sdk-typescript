import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_DownloadMobileAppBuild action
 */
export interface msdyn_DownloadMobileAppBuildResponse {
  Result: string;
}

/**
 * msdyn_DownloadMobileAppBuild action
 *
 * Unbound action
 */
export class msdyn_DownloadMobileAppBuildAction implements Executable<msdyn_DownloadMobileAppBuildResponse> {
  constructor(
    public readonly buildId: string,
    public readonly msdyn_MobileApp: msdyn_mobileapp
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DownloadMobileAppBuild`;

    const body: Record<string, unknown> = {
      BuildId: this.buildId,
      msdyn_MobileApp: this.msdyn_MobileApp,
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

  async parseResponse(response: Response): Promise<msdyn_DownloadMobileAppBuildResponse> {
    const data = await response.json();
    return data as msdyn_DownloadMobileAppBuildResponse;
  }
}
