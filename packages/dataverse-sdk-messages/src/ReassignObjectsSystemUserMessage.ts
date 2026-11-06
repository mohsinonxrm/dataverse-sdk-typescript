import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ReassignObjectsSystemUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReassignObjectsSystemUserRequestParameters {
  ReassignPrincipal: EntityReference | AnyEntityPayload;
  objectType?: number;
}

/**
 * ReassignObjectsSystemUser request message
 *
 * Web API Action: ReassignObjectsSystemUser
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class ReassignObjectsSystemUserRequest
  extends OrganizationRequest
  implements Executable<ReassignObjectsSystemUserResponse>
{
  declare readonly Parameters: Readonly<ReassignObjectsSystemUserRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: ReassignObjectsSystemUserRequestParameters
  ) {
    super("ReassignObjectsSystemUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.ReassignObjectsSystemUser`;

    const body = requestBody({
      ReassignPrincipal: this.Parameters.ReassignPrincipal,
      objectType: this.Parameters.objectType,
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

  parseResponse(_response: Response): Promise<ReassignObjectsSystemUserResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ReassignObjectsSystemUserResponse());
  }
}

/**
 * ReassignObjectsSystemUser response message
 */
export class ReassignObjectsSystemUserResponse extends OrganizationResponse {
  constructor() {
    super("ReassignObjectsSystemUser");
  }

  static fromResponse(_data?: unknown): ReassignObjectsSystemUserResponse {
    return new ReassignObjectsSystemUserResponse();
  }
}
