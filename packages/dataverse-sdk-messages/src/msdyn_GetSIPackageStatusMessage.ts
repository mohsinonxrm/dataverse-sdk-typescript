import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSIPackageStatus request message
 *
 * Web API Action: msdyn_GetSIPackageStatus
 */
export class msdyn_GetSIPackageStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSIPackageStatusResponse>
{
  constructor(public apiVersion: string) {
    super("msdyn_GetSIPackageStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIPackageStatus`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSIPackageStatusResponse> {
    const data = await response.json();
    return msdyn_GetSIPackageStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * msdyn_GetSIPackageStatus response message
 */
export class msdyn_GetSIPackageStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSIPackageStatusResponse) {
    super("msdyn_GetSIPackageStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSIPackageStatusResponse {
    return new msdyn_GetSIPackageStatusResponse((data as any).value);
  }
}
