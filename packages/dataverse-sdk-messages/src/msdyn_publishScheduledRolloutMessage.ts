import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_publishScheduledRollout request message
 *
 * Web API Action: msdyn_publishScheduledRollout
 */
export class msdyn_publishScheduledRolloutRequest
  extends OrganizationRequest
  implements Executable<msdyn_publishScheduledRolloutResponse>
{
  constructor(public rolloutPlanId: string) {
    super("msdyn_publishScheduledRollout");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_publishScheduledRollout`;

    const body: Record<string, unknown> = {
      RolloutPlanId: this.rolloutPlanId,
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

  async parseResponse(response: Response): Promise<msdyn_publishScheduledRolloutResponse> {
    // No return value (204 No Content)
    return new msdyn_publishScheduledRolloutResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RolloutPlanId: this.rolloutPlanId,
    };
  }
}

/**
 * msdyn_publishScheduledRollout response message
 */
export class msdyn_publishScheduledRolloutResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_publishScheduledRollout");
  }

  static fromResponse(_data: unknown): msdyn_publishScheduledRolloutResponse {
    return new msdyn_publishScheduledRolloutResponse();
  }
}
