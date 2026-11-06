import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetUserConsentStatusResponse as msdyn_GetUserConsentStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetUserConsentStatus request message
 *
 * Web API Action: msdyn_GetUserConsentStatus
 */
export class msdyn_GetUserConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetUserConsentStatusResponse>
{
  constructor() {
    super("msdyn_GetUserConsentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetUserConsentStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetUserConsentStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetUserConsentStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetUserConsentStatus response message
 */
export class msdyn_GetUserConsentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetUserConsentStatusResponseData) {
    super("msdyn_GetUserConsentStatus");
  }

  static fromResponse(data: unknown): msdyn_GetUserConsentStatusResponse {
    return new msdyn_GetUserConsentStatusResponse(
      responseObject<msdyn_GetUserConsentStatusResponseData>(data)
    );
  }
}
