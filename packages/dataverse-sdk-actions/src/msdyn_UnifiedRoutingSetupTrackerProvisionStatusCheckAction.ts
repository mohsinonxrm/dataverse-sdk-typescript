import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse {
  Status: boolean;
}

/**
 * Parameters of the msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckActionParameters {
  HasTimedOut: boolean;
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action
 *
 * Unbound action
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckAction implements Executable<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse> {
  constructor(
    public readonly parameters: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck`;

    const body = requestBody({
      HasTimedOut: this.parameters.HasTimedOut,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse;
  }
}
