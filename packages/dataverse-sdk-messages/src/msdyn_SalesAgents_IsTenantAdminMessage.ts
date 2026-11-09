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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_IsTenantAdminResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_IsTenantAdmin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_IsTenantAdminResult {
  "@odata.context"?: string;
  IsTenantAdmin: boolean;
}

/**
 * msdyn_SalesAgents_IsTenantAdmin response message
 *
 * `result` is the value the msdyn_SalesAgents_IsTenantAdmin action returns (see {@link msdyn_SalesAgents_IsTenantAdminResult}).
 */
export class msdyn_SalesAgents_IsTenantAdminResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsTenantAdminResult) {
    super("msdyn_SalesAgents_IsTenantAdmin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_IsTenantAdminResponse {
    return new msdyn_SalesAgents_IsTenantAdminResponse(
      data as msdyn_SalesAgents_IsTenantAdminResult
    );
  }
}
