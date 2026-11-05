import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeactivateEntityKey request message
 *
 * Web API Action: DeactivateEntityKey
 */
export class DeactivateEntityKeyRequest
  extends OrganizationRequest
  implements Executable<DeactivateEntityKeyResponse>
{
  constructor(
    public entityKeyLogicalName: string,
    public entityLogicalName: string
  ) {
    super("DeactivateEntityKey");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeactivateEntityKey`;

    const body: Record<string, unknown> = {
      EntityKeyLogicalName: this.entityKeyLogicalName,
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(response: Response): Promise<DeactivateEntityKeyResponse> {
    // No return value (204 No Content)
    return new DeactivateEntityKeyResponse();
  }
}

/**
 * DeactivateEntityKey response message
 */
export class DeactivateEntityKeyResponse extends OrganizationResponse {
  constructor() {
    super("DeactivateEntityKey");
  }

  static fromResponse(_data: unknown): DeactivateEntityKeyResponse {
    return new DeactivateEntityKeyResponse();
  }
}
