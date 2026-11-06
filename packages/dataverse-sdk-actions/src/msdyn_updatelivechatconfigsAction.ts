import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_updatelivechatconfigs action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_updatelivechatconfigsResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_updatelivechatconfigsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
