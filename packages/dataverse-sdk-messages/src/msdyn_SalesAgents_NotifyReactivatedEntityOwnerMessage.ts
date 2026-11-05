import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_NotifyReactivatedEntityOwner request message
 *
 * Web API Action: msdyn_SalesAgents_NotifyReactivatedEntityOwner
 */
export class msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse>
{
  constructor(
    public msdyn_EntityTypeName: string,
    public msdyn_EntityId: string
  ) {
    super("msdyn_SalesAgents_NotifyReactivatedEntityOwner");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_NotifyReactivatedEntityOwner`;

    const body: Record<string, unknown> = {
      msdyn_EntityTypeName: this.msdyn_EntityTypeName,
      msdyn_EntityId: this.msdyn_EntityId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesAgents_NotifyReactivatedEntityOwner response message
 */
export class msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponseData) {
    super("msdyn_SalesAgents_NotifyReactivatedEntityOwner");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse {
    return new msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse(
      responseObject<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponseData>(data)
    );
  }
}
