import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_DeleteFlow action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DeleteFlowResponse = void;

/**
 * msdyn_DeleteFlow action
 *
 * Unbound action
 */
export class msdyn_DeleteFlowAction implements Executable<msdyn_DeleteFlowResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteFlow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_DeleteFlowResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
