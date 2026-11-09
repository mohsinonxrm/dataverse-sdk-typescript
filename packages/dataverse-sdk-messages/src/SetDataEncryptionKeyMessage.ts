import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetDataEncryptionKey message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetDataEncryptionKeyRequestParameters {
  EncryptionKey: string;
  ChangeEncryptionKey: boolean;
}

/**
 * SetDataEncryptionKey request message
 *
 * Web API Action: SetDataEncryptionKey
 */
export class SetDataEncryptionKeyRequest
  extends OrganizationRequest
  implements Executable<SetDataEncryptionKeyResponse>
{
  declare readonly Parameters: Readonly<SetDataEncryptionKeyRequestParameters>;

  constructor(parameters: SetDataEncryptionKeyRequestParameters) {
    super("SetDataEncryptionKey", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetDataEncryptionKey`;

    const body = requestBody({
      EncryptionKey: this.Parameters.EncryptionKey,
      ChangeEncryptionKey: this.Parameters.ChangeEncryptionKey,
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
    // No return value (204 No Content)
    return Promise.resolve(new SetDataEncryptionKeyResponse());
  }
}

/**
 * SetDataEncryptionKey response message
 */
export class SetDataEncryptionKeyResponse extends OrganizationResponse {
  constructor() {
    super("SetDataEncryptionKey");
  }

  static fromResponse(_data?: unknown): SetDataEncryptionKeyResponse {
    return new SetDataEncryptionKeyResponse();
  }
}
