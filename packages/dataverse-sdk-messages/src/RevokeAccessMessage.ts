import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the RevokeAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RevokeAccessRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  Revokee: EntityReference | AnyEntityPayload;
}

/**
 * RevokeAccess request message
 *
 * Web API Action: RevokeAccess
 */
export class RevokeAccessRequest
  extends OrganizationRequest
  implements Executable<RevokeAccessResponse>
{
  declare readonly Parameters: Readonly<RevokeAccessRequestParameters>;

  constructor(parameters: RevokeAccessRequestParameters) {
    super("RevokeAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeAccess`;

    const body = requestBody({
      Target: this.Parameters.Target,
      Revokee: this.Parameters.Revokee,
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

  async parseResponse(response: Response): Promise<RevokeAccessResponse> {
    // No return value (204 No Content)
    return new RevokeAccessResponse();
  }
}

/**
 * RevokeAccess response message
 */
export class RevokeAccessResponse extends OrganizationResponse {
  constructor() {
    super("RevokeAccess");
  }

  static fromResponse(_data: unknown): RevokeAccessResponse {
    return new RevokeAccessResponse();
  }
}
