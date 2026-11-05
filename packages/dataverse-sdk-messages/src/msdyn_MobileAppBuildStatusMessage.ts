import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * msdyn_MobileAppBuildStatus request message
 *
 * Web API Action: msdyn_MobileAppBuildStatus
 */
export class msdyn_MobileAppBuildStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_MobileAppBuildStatusResponse>
{
  constructor(
    public operationId: string,
    public msdyn_MobileApp: msdyn_mobileapp
  ) {
    super("msdyn_MobileAppBuildStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuildStatus`;

    const body: Record<string, unknown> = {
      OperationId: this.operationId,
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

  async parseResponse(response: Response): Promise<msdyn_MobileAppBuildStatusResponse> {
    const data = await response.json();
    return msdyn_MobileAppBuildStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OperationId: this.operationId,
      msdyn_MobileApp: this.msdyn_MobileApp,
    };
  }
}

/**
 * msdyn_MobileAppBuildStatus response message
 */
export class msdyn_MobileAppBuildStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_MobileAppBuildStatusResponse) {
    super("msdyn_MobileAppBuildStatus");
  }

  static fromResponse(data: unknown): msdyn_MobileAppBuildStatusResponse {
    return new msdyn_MobileAppBuildStatusResponse((data as any).value);
  }
}
