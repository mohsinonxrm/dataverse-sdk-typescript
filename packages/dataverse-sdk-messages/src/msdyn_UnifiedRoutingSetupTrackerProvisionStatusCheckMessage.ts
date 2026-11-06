import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters {
  HasTimedOut: boolean;
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck request message
 *
 * Web API Action: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequest
  extends OrganizationRequest
  implements Executable<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse>
{
  declare readonly Parameters: Readonly<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters>;

  constructor(parameters: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters) {
    super("msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck`;

    const body = requestBody({
      HasTimedOut: this.Parameters.HasTimedOut,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResult {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck response message
 *
 * `result` is the value the msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action returns (see {@link msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResult}).
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse extends OrganizationResponse {
  constructor(public result: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResult) {
    super("msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse {
    return new msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse(
      data as msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResult
    );
  }
}
