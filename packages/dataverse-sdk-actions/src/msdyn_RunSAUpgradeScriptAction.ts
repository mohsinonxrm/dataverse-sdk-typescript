import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RunSAUpgradeScript action
 */
export interface msdyn_RunSAUpgradeScriptResponse {
  // No content returned
}

/**
 * msdyn_RunSAUpgradeScript action
 *
 * Unbound action
 */
export class msdyn_RunSAUpgradeScriptAction implements Executable<msdyn_RunSAUpgradeScriptResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RunSAUpgradeScript`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RunSAUpgradeScriptResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RunSAUpgradeScriptResponse;
  }
}
