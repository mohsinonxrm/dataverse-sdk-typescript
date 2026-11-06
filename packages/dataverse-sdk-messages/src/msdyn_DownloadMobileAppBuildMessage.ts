import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Parameters of the msdyn_DownloadMobileAppBuild message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DownloadMobileAppBuildRequestParameters {
  BuildId?: string;
  ArtifactType?: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
  PipelineId?: string;
}

/**
 * msdyn_DownloadMobileAppBuild request message
 *
 * Web API Action: msdyn_DownloadMobileAppBuild
 */
export class msdyn_DownloadMobileAppBuildRequest
  extends OrganizationRequest
  implements Executable<msdyn_DownloadMobileAppBuildResponse>
{
  declare readonly Parameters: Readonly<msdyn_DownloadMobileAppBuildRequestParameters>;

  constructor(parameters: msdyn_DownloadMobileAppBuildRequestParameters) {
    super("msdyn_DownloadMobileAppBuild", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DownloadMobileAppBuild`;

    const body = requestBody({
      BuildId: this.Parameters.BuildId,
      ArtifactType: this.Parameters.ArtifactType,
      msdyn_MobileApp: this.Parameters.msdyn_MobileApp,
      PipelineId: this.Parameters.PipelineId,
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

  async parseResponse(response: Response): Promise<msdyn_DownloadMobileAppBuildResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DownloadMobileAppBuildResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DownloadMobileAppBuild action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DownloadMobileAppBuildResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_DownloadMobileAppBuild response message
 *
 * `result` is the value the msdyn_DownloadMobileAppBuild action returns (see {@link msdyn_DownloadMobileAppBuildResult}).
 */
export class msdyn_DownloadMobileAppBuildResponse extends OrganizationResponse {
  constructor(public result: msdyn_DownloadMobileAppBuildResult) {
    super("msdyn_DownloadMobileAppBuild");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DownloadMobileAppBuildResponse {
    return new msdyn_DownloadMobileAppBuildResponse(data as msdyn_DownloadMobileAppBuildResult);
  }
}
