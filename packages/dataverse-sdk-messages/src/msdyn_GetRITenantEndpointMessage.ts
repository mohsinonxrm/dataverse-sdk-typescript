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
    const data = await response.json();
    return msdyn_GetRITenantEndpointResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetRITenantEndpoint response message
 */
export class msdyn_GetRITenantEndpointResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRITenantEndpointResponse) {
    super("msdyn_GetRITenantEndpoint");
  }

  static fromResponse(data: unknown): msdyn_GetRITenantEndpointResponse {
    return new msdyn_GetRITenantEndpointResponse((data as any).value);
  }
}
