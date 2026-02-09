import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ReEngageEntity request message
 *
 * Web API Action: msdyn_SalesAgents_ReEngageEntity
 */
export class msdyn_SalesAgents_ReEngageEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ReEngageEntityResponse>
{
  constructor(
    public msdyn_EntityTypeName: string,
    public msdyn_EntityId: string
  ) {
    super("msdyn_SalesAgents_ReEngageEntity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ReEngageEntity`;

    const body: Record<string, unknown> = {
      msdyn_EntityTypeName: this.msdyn_EntityTypeName,
      msdyn_EntityId: this.msdyn_EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ReEngageEntityResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_ReEngageEntityResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_EntityTypeName: this.msdyn_EntityTypeName,
      msdyn_EntityId: this.msdyn_EntityId,
    };
  }
}

/**
 * msdyn_SalesAgents_ReEngageEntity response message
 */
export class msdyn_SalesAgents_ReEngageEntityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_ReEngageEntity");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_ReEngageEntityResponse {
    return new msdyn_SalesAgents_ReEngageEntityResponse();
  }
}
