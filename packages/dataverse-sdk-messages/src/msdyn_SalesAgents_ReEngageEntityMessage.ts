import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ReEngageEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ReEngageEntityRequestParameters {
  msdyn_EntityTypeName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_SalesAgents_ReEngageEntity request message
 *
 * Web API Action: msdyn_SalesAgents_ReEngageEntity
 */
export class msdyn_SalesAgents_ReEngageEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ReEngageEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ReEngageEntityRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ReEngageEntityRequestParameters) {
    super("msdyn_SalesAgents_ReEngageEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ReEngageEntity`;

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

  parseResponse(_response: Response): Promise<msdyn_SalesAgents_ReEngageEntityResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SalesAgents_ReEngageEntityResponse());
  }
}

/**
 * msdyn_SalesAgents_ReEngageEntity response message
 */
export class msdyn_SalesAgents_ReEngageEntityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_ReEngageEntity");
  }

  static fromResponse(_data?: unknown): msdyn_SalesAgents_ReEngageEntityResponse {
    return new msdyn_SalesAgents_ReEngageEntityResponse();
  }
}
