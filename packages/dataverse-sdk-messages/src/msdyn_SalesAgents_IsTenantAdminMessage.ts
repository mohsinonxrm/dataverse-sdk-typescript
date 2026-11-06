import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_IsTenantAdminResponse as msdyn_SalesAgents_IsTenantAdminResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_IsTenantAdmin request message
 *
 * Web API Action: msdyn_SalesAgents_IsTenantAdmin
 */
export class msdyn_SalesAgents_IsTenantAdminRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_IsTenantAdminResponse>
{
  constructor() {
    super("msdyn_SalesAgents_IsTenantAdmin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsTenantAdmin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_IsTenantAdminResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAgents_IsTenantAdminResponse.fromResponse({});
    return msdyn_SalesAgents_IsTenantAdminResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_IsTenantAdmin response message
 */
export class msdyn_SalesAgents_IsTenantAdminResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsTenantAdminResponseData) {
    super("msdyn_SalesAgents_IsTenantAdmin");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_IsTenantAdminResponse {
    return new msdyn_SalesAgents_IsTenantAdminResponse(
      responseObject<msdyn_SalesAgents_IsTenantAdminResponseData>(data)
    );
  }
}
