import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ParentIoTAlerts request message
 *
 * Web API Action: msdyn_ParentIoTAlerts
 */
export class msdyn_ParentIoTAlertsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ParentIoTAlertsResponse>
{
  constructor(
    public msdyn_iotalertId: string,
    public timespanSeconds: number
  ) {
    super("msdyn_ParentIoTAlerts");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_iotalerts(${this.msdyn_iotalertId})/Microsoft.Dynamics.CRM.msdyn_ParentIoTAlerts`;

    const body: Record<string, unknown> = {
      TimespanSeconds: this.timespanSeconds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ParentIoTAlertsResponse> {
    // No return value (204 No Content)
    return new msdyn_ParentIoTAlertsResponse();
  }
}

/**
 * msdyn_ParentIoTAlerts response message
 */
export class msdyn_ParentIoTAlertsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ParentIoTAlerts");
  }

  static fromResponse(_data: unknown): msdyn_ParentIoTAlertsResponse {
    return new msdyn_ParentIoTAlertsResponse();
  }
}
