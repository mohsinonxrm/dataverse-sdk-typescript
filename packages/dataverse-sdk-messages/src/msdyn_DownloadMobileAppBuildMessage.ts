import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_DownloadMobileAppBuildResponse as msdyn_DownloadMobileAppBuildResponseData,
  msdyn_mobileapp,
} from "./types/index.js";

/**
 * Parameters of the msdyn_DownloadMobileAppBuild message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DownloadMobileAppBuildRequestParameters {
  BuildId?: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
}

/**
 * msdyn_DownloadMobileAppBuild request message
 *
 * Web API Action: msdyn_DownloadMobileAppBuild
 */
export class msdyn_DownloadMobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_DownloadMobileAppBuildResponse>
{
  declare readonly Parameters: Readonly<msdyn_DownloadMobileAppBuildRequestParameters>;

  constructor(parameters: msdyn_DownloadMobileAppBuildRequestParameters) {
    super("msdyn_DownloadMobileAppBuild", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DownloadMobileAppBuild`;

    const body = requestBody({
      BuildId: this.Parameters.BuildId,
      msdyn_MobileApp: this.Parameters.msdyn_MobileApp,
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

  async parseResponse(response: Response): Promise<msdyn_DownloadMobileAppBuildResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_DownloadMobileAppBuildResponse.fromResponse({});
    return msdyn_DownloadMobileAppBuildResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_DownloadMobileAppBuild response message
 */
export class msdyn_DownloadMobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_DownloadMobileAppBuildResponseData) {
    super("msdyn_DownloadMobileAppBuild");
  }

  static fromResponse(data: unknown): msdyn_DownloadMobileAppBuildResponse {
    return new msdyn_DownloadMobileAppBuildResponse(
      responseObject<msdyn_DownloadMobileAppBuildResponseData>(data)
    );
  }
}
