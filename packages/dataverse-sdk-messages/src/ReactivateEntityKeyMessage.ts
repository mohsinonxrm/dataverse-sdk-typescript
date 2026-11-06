import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ReactivateEntityKey request message
 *
 * Web API Action: ReactivateEntityKey
 */
export class ReactivateEntityKeyRequest
  extends OrganizationRequest
  implements Executable<ReactivateEntityKeyResponse>
{
  constructor(
    public entityKeyLogicalName: string,
    public entityLogicalName: string
  ) {
    super("ReactivateEntityKey");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReactivateEntityKey`;

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

  async parseResponse(response: Response): Promise<ReactivateEntityKeyResponse> {
    // No return value (204 No Content)
    return new ReactivateEntityKeyResponse();
  }
}

/**
 * ReactivateEntityKey response message
 */
export class ReactivateEntityKeyResponse extends OrganizationResponse {
  constructor() {
    super("ReactivateEntityKey");
  }

  static fromResponse(_data: unknown): ReactivateEntityKeyResponse {
    return new ReactivateEntityKeyResponse();
  }
}
