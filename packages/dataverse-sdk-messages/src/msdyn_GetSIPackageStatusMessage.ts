import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSIPackageStatusResponse as msdyn_GetSIPackageStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSIPackageStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSIPackageStatusRequestParameters {
  ApiVersion?: string;
}

/**
 * msdyn_GetSIPackageStatus request message
 *
 * Web API Action: msdyn_GetSIPackageStatus
 */
export class msdyn_GetSIPackageStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSIPackageStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSIPackageStatusRequestParameters>;

  constructor(parameters: msdyn_GetSIPackageStatusRequestParameters = {}) {
    super("msdyn_GetSIPackageStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIPackageStatus`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<msdyn_GetSIPackageStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSIPackageStatusResponse.fromResponse({});
    return msdyn_GetSIPackageStatusResponse.fromResponse(await response.json());
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
