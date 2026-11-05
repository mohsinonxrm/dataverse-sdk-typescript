import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * LeaveGroup request message
 *
 * Web API Action: LeaveGroup
 */
export class LeaveGroupRequest
  extends OrganizationRequest
  implements Executable<LeaveGroupResponse>
{
  constructor(public flowmachineId: string) {
    super("LeaveGroup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachines(${this.flowmachineId})/Microsoft.Dynamics.CRM.LeaveGroup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<LeaveGroupResponse> {
    // No return value (204 No Content)
    return new LeaveGroupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.flowmachineId,
    };
  }
}

/**
 * LeaveGroup response message
 */
export class LeaveGroupResponse extends OrganizationResponse {
  constructor() {
    super("LeaveGroup");
  }

  static fromResponse(_data: unknown): LeaveGroupResponse {
    return new LeaveGroupResponse();
  }
}
