import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the NotifyEnvironmentVariableSecretChange message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface NotifyEnvironmentVariableSecretChangeRequestParameters {
  KeyVaultUrl: string;
  SecretName: string;
}

/**
 * NotifyEnvironmentVariableSecretChange request message
 *
 * Web API Action: NotifyEnvironmentVariableSecretChange
 */
export class NotifyEnvironmentVariableSecretChangeRequest
  extends OrganizationRequest
  implements Executable<NotifyEnvironmentVariableSecretChangeResponse>
{
  declare readonly Parameters: Readonly<NotifyEnvironmentVariableSecretChangeRequestParameters>;

  constructor(parameters: NotifyEnvironmentVariableSecretChangeRequestParameters) {
    super("NotifyEnvironmentVariableSecretChange", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/NotifyEnvironmentVariableSecretChange`;

    const body = requestBody({
      KeyVaultUrl: this.Parameters.KeyVaultUrl,
      SecretName: this.Parameters.SecretName,
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

  async parseResponse(response: Response): Promise<NotifyEnvironmentVariableSecretChangeResponse> {
    // No return value (204 No Content)
    return new NotifyEnvironmentVariableSecretChangeResponse();
  }
}

/**
 * NotifyEnvironmentVariableSecretChange response message
 */
export class NotifyEnvironmentVariableSecretChangeResponse extends OrganizationResponse {
  constructor() {
    super("NotifyEnvironmentVariableSecretChange");
  }

  static fromResponse(_data: unknown): NotifyEnvironmentVariableSecretChangeResponse {
    return new NotifyEnvironmentVariableSecretChangeResponse();
  }
}
