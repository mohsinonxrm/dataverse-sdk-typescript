import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_EnableUnstructuredData action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_EnableUnstructuredDataResponse = void;

/**
 * msdyn_EnableUnstructuredData action
 *
 * Unbound action
 */
export class msdyn_EnableUnstructuredDataAction implements Executable<msdyn_EnableUnstructuredDataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableUnstructuredData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_EnableUnstructuredDataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
