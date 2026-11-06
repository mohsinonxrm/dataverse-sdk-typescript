import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization } from "./types/index.js";

/**
 * Parameters of the GrantDelegatedAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantDelegatedAccessRequestParameters {
  delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>;
  target: EntityReference | AnyEntityPayload;
  owneraccess: boolean;
}

/**
 * GrantDelegatedAccess request message
 *
 * Web API Action: GrantDelegatedAccess
 */
export class GrantDelegatedAccessRequest
  extends OrganizationRequest
  implements Executable<GrantDelegatedAccessResponse>
{
  declare readonly Parameters: Readonly<GrantDelegatedAccessRequestParameters>;

  constructor(parameters: GrantDelegatedAccessRequestParameters) {
    super("GrantDelegatedAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantDelegatedAccess`;

    const body = requestBody({
      delegatedauthorization: this.Parameters.delegatedauthorization,
      target: this.Parameters.target,
      owneraccess: this.Parameters.owneraccess,
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

  async parseResponse(response: Response): Promise<GrantDelegatedAccessResponse> {
    // No return value (204 No Content)
    return new GrantDelegatedAccessResponse();
  }
}

/**
 * GrantDelegatedAccess response message
 */
export class GrantDelegatedAccessResponse extends OrganizationResponse {
  constructor() {
    super("GrantDelegatedAccess");
  }

  static fromResponse(_data: unknown): GrantDelegatedAccessResponse {
    return new GrantDelegatedAccessResponse();
  }
}
