import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveDataEncryptionKey function
 */
export interface RetrieveDataEncryptionKeyResponse {
  EncryptionKey: string;
}

/**
 * RetrieveDataEncryptionKey function
 *
 * Unbound function
 */
export class RetrieveDataEncryptionKeyFunction implements Executable<RetrieveDataEncryptionKeyResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDataEncryptionKey`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveDataEncryptionKeyResponse> {
    const data = await response.json();
    return data as RetrieveDataEncryptionKeyResponse;
  }
}
