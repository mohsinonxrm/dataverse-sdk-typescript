import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsLinkedInDataValidationEnabled action
 */
export interface msdyn_IsLinkedInDataValidationEnabledResponse {
  Result: string;
}

/**
 * msdyn_IsLinkedInDataValidationEnabled action
 *
 * Unbound action
 */
export class msdyn_IsLinkedInDataValidationEnabledAction implements Executable<msdyn_IsLinkedInDataValidationEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsLinkedInDataValidationEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsLinkedInDataValidationEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IsLinkedInDataValidationEnabledResponse;
  }
}
