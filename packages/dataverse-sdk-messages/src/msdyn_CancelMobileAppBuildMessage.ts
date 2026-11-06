import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CancelMobileAppBuildResponse as msdyn_CancelMobileAppBuildResponseData,
  msdyn_mobileapp,
} from "./types/index.js";

/**
 * msdyn_CancelMobileAppBuild request message
 *
 * Web API Action: msdyn_CancelMobileAppBuild
 */
export class msdyn_CancelMobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelMobileAppBuildResponse>
{
  constructor(
    public operationId: string,
    public msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>
  ) {
    super("msdyn_CancelMobileAppBuild");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelMobileAppBuild`;

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

  async parseResponse(response: Response): Promise<msdyn_CancelMobileAppBuildResponse> {
    const data = await response.json();
    return msdyn_CancelMobileAppBuildResponse.fromResponse(data);
  }
}

/**
 * msdyn_CancelMobileAppBuild response message
 */
export class msdyn_CancelMobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelMobileAppBuildResponseData) {
    super("msdyn_CancelMobileAppBuild");
  }

  static fromResponse(data: unknown): msdyn_CancelMobileAppBuildResponse {
    return new msdyn_CancelMobileAppBuildResponse(
      responseObject<msdyn_CancelMobileAppBuildResponseData>(data)
    );
  }
}
