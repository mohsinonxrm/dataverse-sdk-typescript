import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_SalesAgents_IsTenantAdminResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SalesAgents_IsTenantAdmin response message
 */
export class msdyn_SalesAgents_IsTenantAdminResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsTenantAdminResponse) {
    super("msdyn_SalesAgents_IsTenantAdmin");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_IsTenantAdminResponse {
    return new msdyn_SalesAgents_IsTenantAdminResponse((data as any).value);
  }
}
