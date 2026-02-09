import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_mobileapp } from "./types/index.js";

/**
 * Response from msdyn_CancelMobileAppBuild action
 */
export interface msdyn_CancelMobileAppBuildResponse {
  Result: string;
}

/**
 * msdyn_CancelMobileAppBuild action
 *
 * Unbound action
 */
export class msdyn_CancelMobileAppBuildAction implements Executable<msdyn_CancelMobileAppBuildResponse> {
  constructor(
    public readonly operationId: string,
    public readonly msdyn_MobileApp: msdyn_mobileapp
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelMobileAppBuild`;

    const body: Record<string, unknown> = {
      OperationId: this.operationId,
      msdyn_MobileApp: this.msdyn_MobileApp,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CancelMobileAppBuildResponse> {
    const data = await response.json();
    return data as msdyn_CancelMobileAppBuildResponse;
  }
}
