import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_EnableLinkedInDataValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EnableLinkedInDataValidationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EnableLinkedInDataValidationResponse;
  }
}
