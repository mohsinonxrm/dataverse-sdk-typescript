import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_MobileAppBuild action
 */
export interface msdyn_MobileAppBuildResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_MobileAppBuild action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildActionParameters {
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
  AppCenterApiToken?: string;
}

/**
 * msdyn_MobileAppBuild action
 *
 * Unbound action
 */
export class msdyn_MobileAppBuildAction implements Executable<msdyn_MobileAppBuildResponse> {
  constructor(public readonly parameters: msdyn_MobileAppBuildActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuild`;

    const body = requestBody({
      msdyn_MobileApp: this.parameters.msdyn_MobileApp,
      AppCenterApiToken: this.parameters.AppCenterApiToken,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MobileAppBuildResponse;
    return (await response.json()) as msdyn_MobileAppBuildResponse;
  }
}
