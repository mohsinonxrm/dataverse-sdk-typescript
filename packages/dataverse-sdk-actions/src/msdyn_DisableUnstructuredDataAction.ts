import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DisableUnstructuredData action
 */
export interface msdyn_DisableUnstructuredDataResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_DisableUnstructuredDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_DisableUnstructuredDataResponse;
  }
}
