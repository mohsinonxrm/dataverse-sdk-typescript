import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck request message
 *
 * Web API Action: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequest
  extends OrganizationRequest
  implements Executable<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse>
{
  constructor(public hasTimedOut: boolean) {
    super("msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck`;

    const body: Record<string, unknown> = {
      HasTimedOut: this.hasTimedOut,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse> {
    const data = await response.json();
    return msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      HasTimedOut: this.hasTimedOut,
    };
  }
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck response message
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse extends OrganizationResponse {
  constructor(public result: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse) {
    super("msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck");
  }

  static fromResponse(data: unknown): msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse {
    return new msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse((data as any).value);
  }
}
