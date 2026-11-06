import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_ValidateTSIKey action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateTSIKeyResponse {
  "@odata.context"?: string;
  Message: string;
}

/**
 * msdyn_ValidateTSIKey action
 *
 * Unbound action
 */
export class msdyn_ValidateTSIKeyAction implements Executable<msdyn_ValidateTSIKeyResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateTSIKey`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSIKeyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ValidateTSIKeyResponse;
  }
}
