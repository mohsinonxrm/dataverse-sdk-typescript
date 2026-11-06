import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * NotifyEnvironmentVariableSecretChange request message
 *
 * Web API Action: NotifyEnvironmentVariableSecretChange
 */
export class NotifyEnvironmentVariableSecretChangeRequest
  extends OrganizationRequest
  implements Executable<NotifyEnvironmentVariableSecretChangeResponse>
{
  constructor(
    public keyVaultUrl: string,
    public secretName: string
  ) {
    super("NotifyEnvironmentVariableSecretChange");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/NotifyEnvironmentVariableSecretChange`;

    const body: Record<string, unknown> = {
      KeyVaultUrl: this.keyVaultUrl,
      SecretName: this.secretName,
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
