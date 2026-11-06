import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRITenantEndpointResponse as msdyn_GetRITenantEndpointResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetRITenantEndpointResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetRITenantEndpoint response message
 */
export class msdyn_GetRITenantEndpointResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRITenantEndpointResponseData) {
    super("msdyn_GetRITenantEndpoint");
  }

  static fromResponse(data: unknown): msdyn_GetRITenantEndpointResponse {
    return new msdyn_GetRITenantEndpointResponse(
      responseObject<msdyn_GetRITenantEndpointResponseData>(data)
    );
  }
}
