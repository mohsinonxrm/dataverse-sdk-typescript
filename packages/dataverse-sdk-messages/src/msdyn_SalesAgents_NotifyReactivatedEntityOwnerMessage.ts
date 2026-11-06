import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_NotifyReactivatedEntityOwner message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequestParameters {
  msdyn_EntityTypeName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_SalesAgents_NotifyReactivatedEntityOwner request message
 *
 * Web API Action: msdyn_SalesAgents_NotifyReactivatedEntityOwner
 */
export class msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequestParameters) {
    super("msdyn_SalesAgents_NotifyReactivatedEntityOwner", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_NotifyReactivatedEntityOwner`;

    const body = requestBody({
      msdyn_EntityTypeName: this.Parameters.msdyn_EntityTypeName,
      msdyn_EntityId: this.Parameters.msdyn_EntityId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse.fromResponse({});
    return msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse.fromResponse(
      await response.json()
    );
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
