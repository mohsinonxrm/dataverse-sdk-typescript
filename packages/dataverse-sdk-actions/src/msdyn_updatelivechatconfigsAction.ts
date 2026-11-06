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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_updatelivechatconfigsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_updatelivechatconfigsResponse;
  }
}
