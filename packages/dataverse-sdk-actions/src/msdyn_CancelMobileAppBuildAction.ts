import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_CancelMobileAppBuild action
 */
export interface msdyn_CancelMobileAppBuildResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_CancelMobileAppBuild action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelMobileAppBuildActionParameters {
  OperationId: string;
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
}

/**
 * msdyn_CancelMobileAppBuild action
 *
 * Unbound action
 */
export class msdyn_CancelMobileAppBuildAction implements Executable<msdyn_CancelMobileAppBuildResponse> {
  constructor(public readonly parameters: msdyn_CancelMobileAppBuildActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelMobileAppBuild`;

    const body = requestBody({
      OperationId: this.parameters.OperationId,
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

  async parseResponse(response: Response): Promise<msdyn_CancelMobileAppBuildResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CancelMobileAppBuildResponse;
    return (await response.json()) as msdyn_CancelMobileAppBuildResponse;
  }
}
