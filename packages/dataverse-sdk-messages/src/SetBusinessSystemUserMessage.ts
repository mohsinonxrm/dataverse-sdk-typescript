import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { businessunit } from "./types/index.js";

/**
 * Parameters of the SetBusinessSystemUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetBusinessSystemUserRequestParameters {
  BusinessUnit: EntityReference | EntityPayload<businessunit>;
  ReassignPrincipal: EntityReference | AnyEntityPayload;
  DoNotMoveAllRecords?: boolean;
}

/**
 * SetBusinessSystemUser request message
 *
 * Web API Action: SetBusinessSystemUser
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class SetBusinessSystemUserRequest
  extends OrganizationRequest
  implements Executable<SetBusinessSystemUserResponse>
{
  declare readonly Parameters: Readonly<SetBusinessSystemUserRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: SetBusinessSystemUserRequestParameters
  ) {
    super("SetBusinessSystemUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetBusinessSystemUser`;

    const body = requestBody({
      BusinessUnit: this.Parameters.BusinessUnit,
      ReassignPrincipal: this.Parameters.ReassignPrincipal,
      DoNotMoveAllRecords: this.Parameters.DoNotMoveAllRecords,
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

  parseResponse(_response: Response): Promise<SetBusinessSystemUserResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SetBusinessSystemUserResponse());
  }
}

/**
 * SetBusinessSystemUser response message
 */
export class SetBusinessSystemUserResponse extends OrganizationResponse {
  constructor() {
    super("SetBusinessSystemUser");
  }

  static fromResponse(_data?: unknown): SetBusinessSystemUserResponse {
    return new SetBusinessSystemUserResponse();
  }
}
