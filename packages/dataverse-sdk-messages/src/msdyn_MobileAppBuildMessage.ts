import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_MobileAppBuildResponse as msdyn_MobileAppBuildResponseData,
  msdyn_mobileapp,
} from "./types/index.js";

/**
 * Parameters of the msdyn_MobileAppBuild message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildRequestParameters {
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
  AppCenterApiToken?: string;
}

/**
 * msdyn_MobileAppBuild request message
 *
 * Web API Action: msdyn_MobileAppBuild
 */
export class msdyn_MobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_MobileAppBuildResponse>
{
  declare readonly Parameters: Readonly<msdyn_MobileAppBuildRequestParameters>;

  constructor(parameters: msdyn_MobileAppBuildRequestParameters) {
    super("msdyn_MobileAppBuild", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuild`;

    const body = requestBody({
      msdyn_MobileApp: this.Parameters.msdyn_MobileApp,
      AppCenterApiToken: this.Parameters.AppCenterApiToken,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_MobileAppBuildResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_MobileAppBuild response message
 */
export class msdyn_MobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_MobileAppBuildResponseData) {
    super("msdyn_MobileAppBuild");
  }

  static fromResponse(data: unknown): msdyn_MobileAppBuildResponse {
    return new msdyn_MobileAppBuildResponse(responseObject<msdyn_MobileAppBuildResponseData>(data));
  }
}
