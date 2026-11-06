import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from IsDataEncryptionActive function
 */
export interface IsDataEncryptionActiveResponse {
  IsActive: boolean;
}

/**
 * IsDataEncryptionActive function
 *
 * Unbound function
 */
export class IsDataEncryptionActiveFunction implements Executable<IsDataEncryptionActiveResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsDataEncryptionActive`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsDataEncryptionActiveResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as IsDataEncryptionActiveResponse;
    return (await response.json()) as IsDataEncryptionActiveResponse;
  }
}
