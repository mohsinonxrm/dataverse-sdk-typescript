import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_InitializeSessionChannel action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_InitializeSessionChannelResponse = void;

/**
 * msdyn_InitializeSessionChannel action
 *
 * Unbound action
 */
export class msdyn_InitializeSessionChannelAction implements Executable<msdyn_InitializeSessionChannelResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitializeSessionChannel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_InitializeSessionChannelResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
