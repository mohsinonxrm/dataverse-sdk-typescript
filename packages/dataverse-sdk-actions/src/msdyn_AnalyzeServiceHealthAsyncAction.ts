import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_AnalyzeServiceHealthAsync action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AnalyzeServiceHealthAsyncResponse = void;

/**
 * msdyn_AnalyzeServiceHealthAsync action
 *
 * Unbound action
 */
export class msdyn_AnalyzeServiceHealthAsyncAction implements Executable<msdyn_AnalyzeServiceHealthAsyncResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyzeServiceHealthAsync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_AnalyzeServiceHealthAsyncResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
