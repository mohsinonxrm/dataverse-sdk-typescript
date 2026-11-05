import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_StartCaseFollowupMonitoring request message
 *
 * Web API Action: msdyn_StartCaseFollowupMonitoring
 */
export class msdyn_StartCaseFollowupMonitoringRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartCaseFollowupMonitoringResponse>
{
  constructor(public incidentId: string) {
    super("msdyn_StartCaseFollowupMonitoring");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.msdyn_StartCaseFollowupMonitoring`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_StartCaseFollowupMonitoringResponse> {
    // No return value (204 No Content)
    return new msdyn_StartCaseFollowupMonitoringResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.incidentId,
    };
  }
}

/**
 * msdyn_StartCaseFollowupMonitoring response message
 */
export class msdyn_StartCaseFollowupMonitoringResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartCaseFollowupMonitoring");
  }

  static fromResponse(_data: unknown): msdyn_StartCaseFollowupMonitoringResponse {
    return new msdyn_StartCaseFollowupMonitoringResponse();
  }
}
