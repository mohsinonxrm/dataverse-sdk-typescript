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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RunSAUpgradeScriptResponse> {
    // No return value (204 No Content)
    return {};
  }
}
