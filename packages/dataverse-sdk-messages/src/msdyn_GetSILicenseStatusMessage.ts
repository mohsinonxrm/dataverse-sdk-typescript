import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSILicenseStatusResponse as msdyn_GetSILicenseStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetSILicenseStatus request message
 *
 * Web API Action: msdyn_GetSILicenseStatus
 */
export class msdyn_GetSILicenseStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSILicenseStatusResponse>
{
  constructor() {
    super("msdyn_GetSILicenseStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSILicenseStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSILicenseStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSILicenseStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSILicenseStatus response message
 */
export class msdyn_GetSILicenseStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSILicenseStatusResponseData) {
    super("msdyn_GetSILicenseStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSILicenseStatusResponse {
    return new msdyn_GetSILicenseStatusResponse(
      responseObject<msdyn_GetSILicenseStatusResponseData>(data)
    );
  }
}
