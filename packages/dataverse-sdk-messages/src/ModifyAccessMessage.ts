import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * ModifyAccess request message
 *
 * Web API Action: ModifyAccess
 */
export class ModifyAccessRequest
  extends OrganizationRequest
  implements Executable<ModifyAccessResponse>
{
  constructor(
    public target: EntityReference,
    public principalAccess: PrincipalAccess
  ) {
    super("ModifyAccess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ModifyAccess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      PrincipalAccess: this.principalAccess,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ModifyAccessResponse> {
    // No return value (204 No Content)
    return new ModifyAccessResponse();
  }
}

/**
 * ModifyAccess response message
 */
export class ModifyAccessResponse extends OrganizationResponse {
  constructor() {
    super("ModifyAccess");
  }

  static fromResponse(_data: unknown): ModifyAccessResponse {
    return new ModifyAccessResponse();
  }
}
