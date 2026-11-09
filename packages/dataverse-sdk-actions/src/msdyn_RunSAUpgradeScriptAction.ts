import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_RunSAUpgradeScript action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_RunSAUpgradeScriptResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_RunSAUpgradeScriptResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
