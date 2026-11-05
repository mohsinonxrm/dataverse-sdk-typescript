import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * msdyn_MobileAppBuild request message
 *
 * Web API Action: msdyn_MobileAppBuild
 */
export class msdyn_MobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_MobileAppBuildResponse>
{
  constructor(
    public msdyn_MobileApp: msdyn_mobileapp,
    public appCenterApiToken: string
  ) {
    super("msdyn_MobileAppBuild");
  }

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
    return msdyn_MobileAppBuildResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_MobileApp: this.msdyn_MobileApp,
      AppCenterApiToken: this.appCenterApiToken,
    };
  }
}

/**
 * msdyn_MobileAppBuild response message
 */
export class msdyn_MobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_MobileAppBuildResponse) {
    super("msdyn_MobileAppBuild");
  }

  static fromResponse(data: unknown): msdyn_MobileAppBuildResponse {
    return new msdyn_MobileAppBuildResponse((data as any).value);
  }
}
