import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetSIPackageStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSIPackageStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSIPackageStatusResult {
  "@odata.context"?: string;
  SIPackageStatus: string;
}

/**
 * msdyn_GetSIPackageStatus response message
 *
 * `result` is the value the msdyn_GetSIPackageStatus action returns (see {@link msdyn_GetSIPackageStatusResult}).
 */
export class msdyn_GetSIPackageStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSIPackageStatusResult) {
    super("msdyn_GetSIPackageStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSIPackageStatusResponse {
    return new msdyn_GetSIPackageStatusResponse(data as msdyn_GetSIPackageStatusResult);
  }
}
