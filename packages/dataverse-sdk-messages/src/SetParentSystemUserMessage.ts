import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Parameters of the SetParentSystemUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetParentSystemUserRequestParameters {
  Parent: EntityReference | EntityPayload<systemuser>;
  KeepChildUsers: boolean;
}

/**
 * SetParentSystemUser request message
 *
 * Web API Action: SetParentSystemUser
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class SetParentSystemUserRequest
  extends OrganizationRequest
  implements Executable<SetParentSystemUserResponse>
{
  declare readonly Parameters: Readonly<SetParentSystemUserRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: SetParentSystemUserRequestParameters
  ) {
    super("SetParentSystemUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetParentSystemUser`;

    const body = requestBody({
      Parent: this.Parameters.Parent,
      KeepChildUsers: this.Parameters.KeepChildUsers,
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

  async parseResponse(response: Response): Promise<SetParentSystemUserResponse> {
    // No return value (204 No Content)
    return new SetParentSystemUserResponse();
  }
}

/**
 * SetParentSystemUser response message
 */
export class SetParentSystemUserResponse extends OrganizationResponse {
  constructor() {
    super("SetParentSystemUser");
  }

  static fromResponse(_data: unknown): SetParentSystemUserResponse {
    return new SetParentSystemUserResponse();
  }
}
