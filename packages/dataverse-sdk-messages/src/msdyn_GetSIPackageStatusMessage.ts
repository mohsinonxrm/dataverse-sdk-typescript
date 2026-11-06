import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSIPackageStatusResponse as msdyn_GetSIPackageStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetSIPackageStatus request message
 *
 * Web API Action: msdyn_GetSIPackageStatus
 */
export class msdyn_GetSIPackageStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSIPackageStatusResponse>
{
  constructor(public apiVersion?: string) {
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSIPackageStatusResponse> {
    const data = await response.json();
    return msdyn_GetSIPackageStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSIPackageStatus response message
 */
export class msdyn_GetSIPackageStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSIPackageStatusResponseData) {
    super("msdyn_GetSIPackageStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSIPackageStatusResponse {
    return new msdyn_GetSIPackageStatusResponse(
      responseObject<msdyn_GetSIPackageStatusResponseData>(data)
    );
  }
}
