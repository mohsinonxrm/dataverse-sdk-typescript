import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Parameters of the GrantAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantAccessRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  PrincipalAccess?: PrincipalAccess;
}

/**
 * GrantAccess request message
 *
 * Web API Action: GrantAccess
 */
export class GrantAccessRequest
  extends OrganizationRequest
  implements Executable<GrantAccessResponse>
{
  declare readonly Parameters: Readonly<GrantAccessRequestParameters>;

  constructor(parameters: GrantAccessRequestParameters) {
    super("GrantAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccess`;

    const body = requestBody({
      Target: this.Parameters.Target,
      PrincipalAccess: enumBody(this.Parameters.PrincipalAccess, "PrincipalAccess"),
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

  parseResponse(_response: Response): Promise<GrantAccessResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new GrantAccessResponse());
  }
}

/**
 * GrantAccess response message
 */
export class GrantAccessResponse extends OrganizationResponse {
  constructor() {
    super("GrantAccess");
  }

  static fromResponse(_data?: unknown): GrantAccessResponse {
    return new GrantAccessResponse();
  }
}
