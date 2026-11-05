import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ParentIoTAlerts action
 */
export interface msdyn_ParentIoTAlertsResponse {
  // No content returned
}

/**
 * msdyn_ParentIoTAlerts action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_iotalert)
 */
export class msdyn_ParentIoTAlertsAction implements Executable<msdyn_ParentIoTAlertsResponse> {
  constructor(
    public readonly msdyn_iotalertId: string,
    public readonly timespanSeconds: number
  ) {}

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
    return {};
  }
}
