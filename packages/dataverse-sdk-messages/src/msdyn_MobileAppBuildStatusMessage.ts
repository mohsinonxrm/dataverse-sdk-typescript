import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Parameters of the msdyn_MobileAppBuildStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildStatusRequestParameters {
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
  OperationId: string;
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
      msdyn_MobileApp: this.Parameters.msdyn_MobileApp,
      OperationId: this.Parameters.OperationId,
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
    // The body is the complex value, with its @odata.context
    return msdyn_MobileAppBuildStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MobileAppBuildStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MobileAppBuildStatusResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_MobileAppBuildStatus response message
 *
 * `result` is the value the msdyn_MobileAppBuildStatus action returns (see {@link msdyn_MobileAppBuildStatusResult}).
 */
export class msdyn_MobileAppBuildStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_MobileAppBuildStatusResult) {
    super("msdyn_MobileAppBuildStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MobileAppBuildStatusResponse {
    return new msdyn_MobileAppBuildStatusResponse(data as msdyn_MobileAppBuildStatusResult);
  }
}
