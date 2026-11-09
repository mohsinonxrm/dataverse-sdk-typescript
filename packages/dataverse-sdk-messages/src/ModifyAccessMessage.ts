import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Parameters of the ModifyAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ModifyAccessRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  PrincipalAccess?: PrincipalAccess;
}

/**
 * ModifyAccess request message
 *
 * Web API Action: ModifyAccess
 */
export class ModifyAccessRequest
  extends OrganizationRequest
  implements Executable<ModifyAccessResponse>
{
  declare readonly Parameters: Readonly<ModifyAccessRequestParameters>;

  constructor(parameters: ModifyAccessRequestParameters) {
    super("ModifyAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ModifyAccess`;

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

  parseResponse(_response: Response): Promise<ModifyAccessResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ModifyAccessResponse());
  }
}

/**
 * ModifyAccess response message
 */
export class ModifyAccessResponse extends OrganizationResponse {
  constructor() {
    super("ModifyAccess");
  }

  static fromResponse(_data?: unknown): ModifyAccessResponse {
    return new ModifyAccessResponse();
  }
}
