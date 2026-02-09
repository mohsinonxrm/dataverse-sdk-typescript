import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse {
  Status: boolean;
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action
 *
 * Unbound action
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckAction implements Executable<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse> {
  constructor(public readonly hasTimedOut: boolean) {}

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
    return data as msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse;
  }
}
