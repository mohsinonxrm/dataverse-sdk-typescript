import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IsLinkedInDataValidationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsLinkedInDataValidationEnabledResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IsLinkedInDataValidationEnabledResponse;
  }
}
