import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsAdvancedUnifiedRoutingEnabledResponse> {
    const data = await response.json();
    return msdyn_IsAdvancedUnifiedRoutingEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_IsAdvancedUnifiedRoutingEnabled response message
 */
export class msdyn_IsAdvancedUnifiedRoutingEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsAdvancedUnifiedRoutingEnabledResponse) {
    super("msdyn_IsAdvancedUnifiedRoutingEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsAdvancedUnifiedRoutingEnabledResponse {
    return new msdyn_IsAdvancedUnifiedRoutingEnabledResponse((data as any).value);
  }
}
