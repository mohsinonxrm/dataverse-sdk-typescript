import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SetDataEncryptionKey action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SetDataEncryptionKeyResponse = void;

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

  parseResponse(_response: Response): Promise<SetDataEncryptionKeyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
