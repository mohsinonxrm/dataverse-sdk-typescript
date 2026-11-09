import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_getAppConfig action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_getAppConfigResponse = void;

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
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_getAppConfigResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
