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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsAdvancedUnifiedRoutingEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IsAdvancedUnifiedRoutingEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IsAdvancedUnifiedRoutingEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsAdvancedUnifiedRoutingEnabledResult {
  "@odata.context"?: string;
  IsAdvancedUnifiedRoutingEnabled: boolean;
}

/**
 * msdyn_IsAdvancedUnifiedRoutingEnabled response message
 *
 * `result` is the value the msdyn_IsAdvancedUnifiedRoutingEnabled action returns (see {@link msdyn_IsAdvancedUnifiedRoutingEnabledResult}).
 */
export class msdyn_IsAdvancedUnifiedRoutingEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsAdvancedUnifiedRoutingEnabledResult) {
    super("msdyn_IsAdvancedUnifiedRoutingEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IsAdvancedUnifiedRoutingEnabledResponse {
    return new msdyn_IsAdvancedUnifiedRoutingEnabledResponse(
      data as msdyn_IsAdvancedUnifiedRoutingEnabledResult
    );
  }
}
