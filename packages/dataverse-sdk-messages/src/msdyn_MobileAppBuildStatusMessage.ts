import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_MobileAppBuildStatusResponse as msdyn_MobileAppBuildStatusResponseData,
  msdyn_mobileapp,
} from "./types/index.js";

/**
 * Parameters of the msdyn_MobileAppBuildStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildStatusRequestParameters {
  OperationId: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
}

/**
 * msdyn_MobileAppBuildStatus request message
 *
 * Web API Action: msdyn_MobileAppBuildStatus
 */
export class msdyn_MobileAppBuildStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_MobileAppBuildStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_MobileAppBuildStatusRequestParameters>;

  constructor(parameters: msdyn_MobileAppBuildStatusRequestParameters) {
    super("msdyn_MobileAppBuildStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuildStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_MobileAppBuildStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_MobileAppBuildStatusResponse.fromResponse({});
    return msdyn_MobileAppBuildStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_MobileAppBuildStatus response message
 */
export class msdyn_MobileAppBuildStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_MobileAppBuildStatusResponseData) {
    super("msdyn_MobileAppBuildStatus");
  }

  static fromResponse(data: unknown): msdyn_MobileAppBuildStatusResponse {
    return new msdyn_MobileAppBuildStatusResponse(
      responseObject<msdyn_MobileAppBuildStatusResponseData>(data)
    );
  }
}
