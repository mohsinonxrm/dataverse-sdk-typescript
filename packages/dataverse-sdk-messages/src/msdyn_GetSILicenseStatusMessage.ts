import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSILicenseStatusResponse> {
    const data = await response.json();
    return msdyn_GetSILicenseStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetSILicenseStatus response message
 */
export class msdyn_GetSILicenseStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSILicenseStatusResponse) {
    super("msdyn_GetSILicenseStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSILicenseStatusResponse {
    return new msdyn_GetSILicenseStatusResponse((data as any).value);
  }
}
