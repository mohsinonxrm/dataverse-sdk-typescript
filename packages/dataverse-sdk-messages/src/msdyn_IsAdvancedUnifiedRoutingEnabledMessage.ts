import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IsAdvancedUnifiedRoutingEnabledResponse as msdyn_IsAdvancedUnifiedRoutingEnabledResponseData } from "./types/index.js";

/**
 * msdyn_IsAdvancedUnifiedRoutingEnabled request message
 *
 * Web API Action: msdyn_IsAdvancedUnifiedRoutingEnabled
 */
export class msdyn_IsAdvancedUnifiedRoutingEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsAdvancedUnifiedRoutingEnabledResponse>
{
  constructor() {
    super("msdyn_IsAdvancedUnifiedRoutingEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsAdvancedUnifiedRoutingEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsAdvancedUnifiedRoutingEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_IsAdvancedUnifiedRoutingEnabledResponse.fromResponse({});
    return msdyn_IsAdvancedUnifiedRoutingEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IsAdvancedUnifiedRoutingEnabled response message
 */
export class msdyn_IsAdvancedUnifiedRoutingEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsAdvancedUnifiedRoutingEnabledResponseData) {
    super("msdyn_IsAdvancedUnifiedRoutingEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsAdvancedUnifiedRoutingEnabledResponse {
    return new msdyn_IsAdvancedUnifiedRoutingEnabledResponse(
      responseObject<msdyn_IsAdvancedUnifiedRoutingEnabledResponseData>(data)
    );
  }
}
