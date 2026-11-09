import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_DisableUnstructuredData action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DisableUnstructuredDataResponse = void;

/**
 * msdyn_DisableUnstructuredData action
 *
 * Unbound action
 */
export class msdyn_DisableUnstructuredDataAction implements Executable<msdyn_DisableUnstructuredDataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisableUnstructuredData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_DisableUnstructuredDataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
