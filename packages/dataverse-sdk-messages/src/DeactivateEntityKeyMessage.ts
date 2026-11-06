import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeactivateEntityKey message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeactivateEntityKeyRequestParameters {
  EntityKeyLogicalName: string;
  EntityLogicalName: string;
}

/**
 * DeactivateEntityKey request message
 *
 * Web API Action: DeactivateEntityKey
 */
export class DeactivateEntityKeyRequest
  extends OrganizationRequest
  implements Executable<DeactivateEntityKeyResponse>
{
  declare readonly Parameters: Readonly<DeactivateEntityKeyRequestParameters>;

  constructor(parameters: DeactivateEntityKeyRequestParameters) {
    super("DeactivateEntityKey", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeactivateEntityKey`;

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
