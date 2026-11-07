import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveDataEncryptionKey function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveDataEncryptionKeyResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveDataEncryptionKeyResponse;
  }
}
