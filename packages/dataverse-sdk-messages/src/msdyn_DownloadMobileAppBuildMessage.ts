import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * msdyn_DownloadMobileAppBuild request message
 *
 * Web API Action: msdyn_DownloadMobileAppBuild
 */
export class msdyn_DownloadMobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_DownloadMobileAppBuildResponse>
{
  constructor(
    public buildId: string,
    public msdyn_MobileApp: msdyn_mobileapp
  ) {
    super("msdyn_DownloadMobileAppBuild");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DownloadMobileAppBuildResponse> {
    const data = await response.json();
    return msdyn_DownloadMobileAppBuildResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      BuildId: this.buildId,
      msdyn_MobileApp: this.msdyn_MobileApp,
    };
  }
}

/**
 * msdyn_DownloadMobileAppBuild response message
 */
export class msdyn_DownloadMobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_DownloadMobileAppBuildResponse) {
    super("msdyn_DownloadMobileAppBuild");
  }

  static fromResponse(data: unknown): msdyn_DownloadMobileAppBuildResponse {
    return new msdyn_DownloadMobileAppBuildResponse((data as any).value);
  }
}
