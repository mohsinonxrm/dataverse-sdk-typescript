import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getAppConfig action
 */
export interface msdyn_getAppConfigResponse {
  // No content returned
}

/**
 * msdyn_getAppConfig action
 *
 * Unbound action
 */
export class msdyn_getAppConfigAction implements Executable<msdyn_getAppConfigResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfig`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getAppConfigResponse> {
    // No return value (204 No Content)
    return {};
  }
}
