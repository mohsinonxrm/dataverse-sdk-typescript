import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SetDataEncryptionKey action
 */
export interface SetDataEncryptionKeyResponse {
  // No content returned
}

/**
 * SetDataEncryptionKey action
 *
 * Unbound action
 */
export class SetDataEncryptionKeyAction implements Executable<SetDataEncryptionKeyResponse> {
  constructor(
    public readonly encryptionKey: string,
    public readonly changeEncryptionKey: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetDataEncryptionKey`;

    const body: Record<string, unknown> = {
      EncryptionKey: this.encryptionKey,
      ChangeEncryptionKey: this.changeEncryptionKey,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SetDataEncryptionKeyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
