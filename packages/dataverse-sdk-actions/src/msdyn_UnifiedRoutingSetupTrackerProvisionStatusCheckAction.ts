import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse;
  }
}
