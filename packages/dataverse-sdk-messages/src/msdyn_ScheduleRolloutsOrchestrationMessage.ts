import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ScheduleRolloutsOrchestration request message
 *
 * Web API Action: msdyn_ScheduleRolloutsOrchestration
 */
export class msdyn_ScheduleRolloutsOrchestrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_ScheduleRolloutsOrchestrationResponse>
{
  constructor() {
    super("msdyn_ScheduleRolloutsOrchestration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScheduleRolloutsOrchestration`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ScheduleRolloutsOrchestrationResponse> {
    // No return value (204 No Content)
    return new msdyn_ScheduleRolloutsOrchestrationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_ScheduleRolloutsOrchestration response message
 */
export class msdyn_ScheduleRolloutsOrchestrationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ScheduleRolloutsOrchestration");
  }

  static fromResponse(_data: unknown): msdyn_ScheduleRolloutsOrchestrationResponse {
    return new msdyn_ScheduleRolloutsOrchestrationResponse();
  }
}
