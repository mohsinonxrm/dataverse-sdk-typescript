import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SetDataEncryptionKey request message
 *
 * Web API Action: SetDataEncryptionKey
 */
export class SetDataEncryptionKeyRequest
  extends OrganizationRequest
  implements Executable<SetDataEncryptionKeyResponse>
{
  constructor(
    public encryptionKey: string,
    public changeEncryptionKey: boolean
  ) {
    super("SetDataEncryptionKey");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SetDataEncryptionKeyResponse> {
    // No return value (204 No Content)
    return new SetDataEncryptionKeyResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EncryptionKey: this.encryptionKey,
      ChangeEncryptionKey: this.changeEncryptionKey,
    };
  }
}

/**
 * SetDataEncryptionKey response message
 */
export class SetDataEncryptionKeyResponse extends OrganizationResponse {
  constructor() {
    super("SetDataEncryptionKey");
  }

  static fromResponse(_data: unknown): SetDataEncryptionKeyResponse {
    return new SetDataEncryptionKeyResponse();
  }
}
