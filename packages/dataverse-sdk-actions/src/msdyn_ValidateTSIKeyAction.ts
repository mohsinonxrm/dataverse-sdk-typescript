import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ValidateTSIKey action
 */
export interface msdyn_ValidateTSIKeyResponse {
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSIKeyResponse> {
    const data = await response.json();
    return data as msdyn_ValidateTSIKeyResponse;
  }
}
