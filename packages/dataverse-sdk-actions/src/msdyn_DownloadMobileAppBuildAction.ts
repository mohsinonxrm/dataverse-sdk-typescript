import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_DownloadMobileAppBuild action
 */
export interface msdyn_DownloadMobileAppBuildResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_DownloadMobileAppBuild action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DownloadMobileAppBuildActionParameters {
  BuildId?: string;
  ArtifactType?: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
  PipelineId?: string;
}

/**
 * msdyn_DownloadMobileAppBuild action
 *
 * Unbound action
 */
export class msdyn_DownloadMobileAppBuildAction implements Executable<msdyn_DownloadMobileAppBuildResponse> {
  constructor(public readonly parameters: msdyn_DownloadMobileAppBuildActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DownloadMobileAppBuild`;

    const body = requestBody({
      BuildId: this.parameters.BuildId,
      ArtifactType: this.parameters.ArtifactType,
      msdyn_MobileApp: this.parameters.msdyn_MobileApp,
      PipelineId: this.parameters.PipelineId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DownloadMobileAppBuildResponse;
    return (await response.json()) as msdyn_DownloadMobileAppBuildResponse;
  }
}
