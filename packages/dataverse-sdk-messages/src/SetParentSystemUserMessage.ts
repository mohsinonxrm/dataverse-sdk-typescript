import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * SetParentSystemUser request message
 *
 * Web API Action: SetParentSystemUser
 */
export class SetParentSystemUserRequest
  extends OrganizationRequest
  implements Executable<SetParentSystemUserResponse>
{
  constructor(
    public systemuserId: string,
    public parent: systemuser,
    public keepChildUsers: boolean
  ) {
    super("SetParentSystemUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetParentSystemUser`;

    const body: Record<string, unknown> = {
      Parent: this.parent,
      KeepChildUsers: this.keepChildUsers,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SetParentSystemUserResponse> {
    // No return value (204 No Content)
    return new SetParentSystemUserResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.systemuserId,
      Parent: this.parent,
      KeepChildUsers: this.keepChildUsers,
    };
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
