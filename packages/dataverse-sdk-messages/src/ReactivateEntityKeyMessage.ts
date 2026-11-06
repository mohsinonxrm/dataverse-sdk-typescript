import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ReactivateEntityKey message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReactivateEntityKeyRequestParameters {
  EntityKeyLogicalName: string;
  EntityLogicalName: string;
}

/**
 * ReactivateEntityKey request message
 *
 * Web API Action: ReactivateEntityKey
 */
export class ReactivateEntityKeyRequest
  extends OrganizationRequest
  implements Executable<ReactivateEntityKeyResponse>
{
  declare readonly Parameters: Readonly<ReactivateEntityKeyRequestParameters>;

  constructor(parameters: ReactivateEntityKeyRequestParameters) {
    super("ReactivateEntityKey", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReactivateEntityKey`;

    const body = requestBody({
      EntityKeyLogicalName: this.Parameters.EntityKeyLogicalName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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
