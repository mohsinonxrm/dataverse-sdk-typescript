import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Parameters of the msdyn_MobileAppBuild message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildRequestParameters {
  PipelineSuffix?: string;
  AppCenterApiToken?: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
}

/**
 * msdyn_MobileAppBuild request message
 *
 * Web API Action: msdyn_MobileAppBuild
 */
export class msdyn_MobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_MobileAppBuildResponse>
{
  declare readonly Parameters: Readonly<msdyn_MobileAppBuildRequestParameters>;

  constructor(parameters: msdyn_MobileAppBuildRequestParameters) {
    super("msdyn_MobileAppBuild", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuild`;

    const body = requestBody({
      PipelineSuffix: this.Parameters.PipelineSuffix,
      AppCenterApiToken: this.Parameters.AppCenterApiToken,
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

  async parseResponse(response: Response): Promise<msdyn_MobileAppBuildResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_MobileAppBuildResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MobileAppBuild action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MobileAppBuildResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_MobileAppBuild response message
 *
 * `result` is the value the msdyn_MobileAppBuild action returns (see {@link msdyn_MobileAppBuildResult}).
 */
export class msdyn_MobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_MobileAppBuildResult) {
    super("msdyn_MobileAppBuild");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MobileAppBuildResponse {
    return new msdyn_MobileAppBuildResponse(data as msdyn_MobileAppBuildResult);
  }
}
