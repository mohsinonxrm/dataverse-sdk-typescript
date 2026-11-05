import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetLicenseInfo request message
 *
 * Web API Action: msdyn_GetLicenseInfo
 */
export class msdyn_GetLicenseInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLicenseInfoResponse>
{
  constructor() {
    super("msdyn_GetLicenseInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLicenseInfo`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLicenseInfoResponse> {
    const data = await response.json();
    return msdyn_GetLicenseInfoResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetLicenseInfo response message
 */
export class msdyn_GetLicenseInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLicenseInfoResponse) {
    super("msdyn_GetLicenseInfo");
  }

  static fromResponse(data: unknown): msdyn_GetLicenseInfoResponse {
    return new msdyn_GetLicenseInfoResponse((data as any).value);
  }
}
