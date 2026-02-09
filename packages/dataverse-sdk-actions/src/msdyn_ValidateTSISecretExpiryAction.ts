import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ValidateTSISecretExpiry action
 */
export interface msdyn_ValidateTSISecretExpiryResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  HelpLink: string;
}

/**
 * msdyn_ValidateTSISecretExpiry action
 *
 * Unbound action
 */
export class msdyn_ValidateTSISecretExpiryAction implements Executable<msdyn_ValidateTSISecretExpiryResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateTSISecretExpiry`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSISecretExpiryResponse> {
    const data = await response.json();
    return data as msdyn_ValidateTSISecretExpiryResponse;
  }
}
