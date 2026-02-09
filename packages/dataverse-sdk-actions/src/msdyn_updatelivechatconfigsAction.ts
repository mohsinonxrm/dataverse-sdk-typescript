import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_updatelivechatconfigs action
 */
export interface msdyn_updatelivechatconfigsResponse {
  // No content returned
}

/**
 * msdyn_updatelivechatconfigs action
 *
 * Unbound action
 */
export class msdyn_updatelivechatconfigsAction implements Executable<msdyn_updatelivechatconfigsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updatelivechatconfigs`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_updatelivechatconfigsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
