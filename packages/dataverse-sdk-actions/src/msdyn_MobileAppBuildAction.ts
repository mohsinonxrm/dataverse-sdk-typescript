import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from the msdyn_MobileAppBuild action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MobileAppBuildResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_MobileAppBuild action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildActionParameters {
  PipelineSuffix?: string;
  AppCenterApiToken?: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
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
      PipelineSuffix: this.parameters.PipelineSuffix,
      AppCenterApiToken: this.parameters.AppCenterApiToken,
      msdyn_MobileApp: this.parameters.msdyn_MobileApp,
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
    return (await response.json()) as msdyn_MobileAppBuildResponse;
  }
}
