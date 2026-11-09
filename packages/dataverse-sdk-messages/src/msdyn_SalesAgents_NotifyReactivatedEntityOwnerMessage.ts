import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_NotifyReactivatedEntityOwner action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_NotifyReactivatedEntityOwnerResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_NotifyReactivatedEntityOwner response message
 *
 * `result` is the value the msdyn_SalesAgents_NotifyReactivatedEntityOwner action returns (see {@link msdyn_SalesAgents_NotifyReactivatedEntityOwnerResult}).
 */
export class msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_NotifyReactivatedEntityOwnerResult) {
    super("msdyn_SalesAgents_NotifyReactivatedEntityOwner");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse {
    return new msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse(
      data as msdyn_SalesAgents_NotifyReactivatedEntityOwnerResult
    );
  }
}
