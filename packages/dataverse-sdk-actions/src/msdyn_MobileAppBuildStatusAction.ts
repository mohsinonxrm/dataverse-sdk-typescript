import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_MobileAppBuildStatus action
 */
export interface msdyn_MobileAppBuildStatusResponse {
  Result: string;
}

/**
 * msdyn_MobileAppBuildStatus action
 *
 * Unbound action
 */
export class msdyn_MobileAppBuildStatusAction implements Executable<msdyn_MobileAppBuildStatusResponse> {
  constructor(
    public readonly operationId: string,
    public readonly msdyn_MobileApp: msdyn_mobileapp
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MobileAppBuildStatus`;

    const body: Record<string, unknown> = {
      OperationId: this.operationId,
      msdyn_MobileApp: this.msdyn_MobileApp,
    };

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
    const data = await response.json();
    return data as msdyn_MobileAppBuildStatusResponse;
  }
}
