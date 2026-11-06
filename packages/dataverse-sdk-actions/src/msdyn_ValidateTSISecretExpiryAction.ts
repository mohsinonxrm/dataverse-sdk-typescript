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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSISecretExpiryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ValidateTSISecretExpiryResponse;
  }
}
