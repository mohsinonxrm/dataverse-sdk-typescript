import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetRITenantEndpoint request message
 *
 * Web API Action: msdyn_GetRITenantEndpoint
 */
export class msdyn_GetRITenantEndpointRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRITenantEndpointResponse>
{
  constructor() {
    super("msdyn_GetRITenantEndpoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRITenantEndpoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRITenantEndpointResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRITenantEndpointResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRITenantEndpoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRITenantEndpointResult {
  "@odata.context"?: string;
  TenantInfo: string;
}

/**
 * msdyn_GetRITenantEndpoint response message
 *
 * `result` is the value the msdyn_GetRITenantEndpoint action returns (see {@link msdyn_GetRITenantEndpointResult}).
 */
export class msdyn_GetRITenantEndpointResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRITenantEndpointResult) {
    super("msdyn_GetRITenantEndpoint");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRITenantEndpointResponse {
    return new msdyn_GetRITenantEndpointResponse(data as msdyn_GetRITenantEndpointResult);
  }
}
