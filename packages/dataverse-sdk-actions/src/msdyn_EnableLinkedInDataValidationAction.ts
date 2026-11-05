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
    const data = await response.json();
    return data as msdyn_EnableLinkedInDataValidationResponse;
  }
}
