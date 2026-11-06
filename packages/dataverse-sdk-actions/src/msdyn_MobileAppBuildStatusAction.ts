import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from the msdyn_MobileAppBuildStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MobileAppBuildStatusResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_MobileAppBuildStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MobileAppBuildStatusActionParameters {
  msdyn_MobileApp: EntityReference | EntityPayload<msdyn_mobileapp>;
  OperationId: string;
}

/**
 * msdyn_MobileAppBuildStatus action
 *
 * Unbound action
 */
export class msdyn_MobileAppBuildStatusAction implements Executable<msdyn_MobileAppBuildStatusResponse> {
  constructor(public readonly parameters: msdyn_MobileAppBuildStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuildStatus`;

    const body = requestBody({
      msdyn_MobileApp: this.parameters.msdyn_MobileApp,
      OperationId: this.parameters.OperationId,
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
    return (await response.json()) as msdyn_MobileAppBuildStatusResponse;
  }
}
