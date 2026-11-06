import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EnableLinkedInDataValidation action
 */
export interface msdyn_EnableLinkedInDataValidationResponse {
  Result: string;
}

/**
 * msdyn_EnableLinkedInDataValidation action
 *
 * Unbound action
 */
export class msdyn_EnableLinkedInDataValidationAction implements Executable<msdyn_EnableLinkedInDataValidationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableLinkedInDataValidation`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableLinkedInDataValidationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_EnableLinkedInDataValidationResponse;
    return (await response.json()) as msdyn_EnableLinkedInDataValidationResponse;
  }
}
