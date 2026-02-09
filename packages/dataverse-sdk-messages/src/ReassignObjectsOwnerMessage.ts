import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * ReassignObjectsOwner request message
 *
 * Web API Action: ReassignObjectsOwner
 */
export class ReassignObjectsOwnerRequest
  extends OrganizationRequest
  implements Executable<ReassignObjectsOwnerResponse>
{
  constructor(
    public fromPrincipal: EntityReference,
    public toPrincipal: EntityReference,
    public objectType: number
  ) {
    super("ReassignObjectsOwner");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReassignObjectsOwner`;

    const body: Record<string, unknown> = {
      FromPrincipal: this.fromPrincipal,
      ToPrincipal: this.toPrincipal,
      objectType: this.objectType,
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

  async parseResponse(response: Response): Promise<ReassignObjectsOwnerResponse> {
    // No return value (204 No Content)
    return new ReassignObjectsOwnerResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FromPrincipal: this.fromPrincipal,
      ToPrincipal: this.toPrincipal,
      objectType: this.objectType,
    };
  }
}

/**
 * ReassignObjectsOwner response message
 */
export class ReassignObjectsOwnerResponse extends OrganizationResponse {
  constructor() {
    super("ReassignObjectsOwner");
  }

  static fromResponse(_data: unknown): ReassignObjectsOwnerResponse {
    return new ReassignObjectsOwnerResponse();
  }
}
