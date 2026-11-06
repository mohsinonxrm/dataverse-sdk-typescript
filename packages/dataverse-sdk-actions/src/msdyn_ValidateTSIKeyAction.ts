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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSIKeyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ValidateTSIKeyResponse;
    return (await response.json()) as msdyn_ValidateTSIKeyResponse;
  }
}
