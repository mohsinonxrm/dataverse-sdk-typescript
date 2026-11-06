import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CancelMobileAppBuildResponse as msdyn_CancelMobileAppBuildResponseData,
  msdyn_mobileapp,
} from "./types/index.js";

/**
 * Parameters of the msdyn_CancelMobileAppBuild message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelMobileAppBuildRequestParameters {
  OperationId: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
}

/**
 * msdyn_CancelMobileAppBuild request message
 *
 * Web API Action: msdyn_CancelMobileAppBuild
 */
export class msdyn_CancelMobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelMobileAppBuildResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelMobileAppBuildRequestParameters>;

  constructor(parameters: msdyn_CancelMobileAppBuildRequestParameters) {
    super("msdyn_CancelMobileAppBuild", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelMobileAppBuild`;

    const body = requestBody({
      OperationId: this.Parameters.OperationId,
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

  async parseResponse(response: Response): Promise<msdyn_CancelMobileAppBuildResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CancelMobileAppBuildResponse.fromResponse(text ? JSON.parse(text) : {});
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
