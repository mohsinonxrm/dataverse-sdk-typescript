import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SetDataEncryptionKey action
 */
export interface SetDataEncryptionKeyResponse {
  // No content returned
}

/**
 * Parameters of the SetDataEncryptionKey action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetDataEncryptionKeyActionParameters {
  EncryptionKey: string;
  ChangeEncryptionKey: boolean;
}

/**
 * SetDataEncryptionKey action
 *
 * Unbound action
 */
export class SetDataEncryptionKeyAction implements Executable<SetDataEncryptionKeyResponse> {
  constructor(public readonly parameters: SetDataEncryptionKeyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetDataEncryptionKey`;

    const body = requestBody({
      EncryptionKey: this.parameters.EncryptionKey,
      ChangeEncryptionKey: this.parameters.ChangeEncryptionKey,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SetDataEncryptionKeyResponse;
    return (await response.json()) as SetDataEncryptionKeyResponse;
  }
}
