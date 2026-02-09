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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsLinkedInDataValidationEnabledResponse> {
    const data = await response.json();
    return data as msdyn_IsLinkedInDataValidationEnabledResponse;
  }
}
