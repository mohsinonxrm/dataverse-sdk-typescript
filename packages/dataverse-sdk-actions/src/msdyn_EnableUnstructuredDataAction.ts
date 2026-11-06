import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EnableUnstructuredData action
 */
export interface msdyn_EnableUnstructuredDataResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_EnableUnstructuredDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_EnableUnstructuredDataResponse;
  }
}
