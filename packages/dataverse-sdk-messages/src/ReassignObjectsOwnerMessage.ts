import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ReassignObjectsOwner message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReassignObjectsOwnerRequestParameters {
  FromPrincipal: EntityReference | AnyEntityPayload;
  ToPrincipal: EntityReference | AnyEntityPayload;
  objectType?: number;
}

/**
 * ReassignObjectsOwner request message
 *
 * Web API Action: ReassignObjectsOwner
 */
export class ReassignObjectsOwnerRequest
  extends OrganizationRequest
  implements Executable<ReassignObjectsOwnerResponse>
{
  declare readonly Parameters: Readonly<ReassignObjectsOwnerRequestParameters>;

  constructor(parameters: ReassignObjectsOwnerRequestParameters) {
    super("ReassignObjectsOwner", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReassignObjectsOwner`;

    const body = requestBody({
      FromPrincipal: this.Parameters.FromPrincipal,
      ToPrincipal: this.Parameters.ToPrincipal,
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

  parseResponse(_response: Response): Promise<ReassignObjectsOwnerResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ReassignObjectsOwnerResponse());
  }
}

/**
 * ReassignObjectsOwner response message
 */
export class ReassignObjectsOwnerResponse extends OrganizationResponse {
  constructor() {
    super("ReassignObjectsOwner");
  }

  static fromResponse(_data?: unknown): ReassignObjectsOwnerResponse {
    return new ReassignObjectsOwnerResponse();
  }
}
