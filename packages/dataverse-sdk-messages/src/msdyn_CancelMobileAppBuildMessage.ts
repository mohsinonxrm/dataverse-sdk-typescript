import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Parameters of the msdyn_CancelMobileAppBuild message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelMobileAppBuildRequestParameters {
  OperationId: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
}

/**
 * msdyn_CancelMobileAppBuild request message
 *
 * Web API Action: msdyn_CancelMobileAppBuild
 */
export class msdyn_CancelMobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelMobileAppBuildResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelMobileAppBuildRequestParameters>;

  constructor(parameters: msdyn_CancelMobileAppBuildRequestParameters) {
    super("msdyn_CancelMobileAppBuild", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelMobileAppBuild`;

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

  async parseResponse(response: Response): Promise<msdyn_CancelMobileAppBuildResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CancelMobileAppBuildResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CancelMobileAppBuild action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelMobileAppBuildResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_CancelMobileAppBuild response message
 *
 * `result` is the value the msdyn_CancelMobileAppBuild action returns (see {@link msdyn_CancelMobileAppBuildResult}).
 */
export class msdyn_CancelMobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelMobileAppBuildResult) {
    super("msdyn_CancelMobileAppBuild");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CancelMobileAppBuildResponse {
    return new msdyn_CancelMobileAppBuildResponse(data as msdyn_CancelMobileAppBuildResult);
  }
}
