import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ParentIoTAlerts action
 */
export interface msdyn_ParentIoTAlertsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ParentIoTAlerts action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ParentIoTAlertsActionParameters {
  TimespanSeconds: number;
}

/**
 * msdyn_ParentIoTAlerts action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_iotalert)
 *
 * The first argument is the id of the msdyn_iotalert record to call it on.
 */
export class msdyn_ParentIoTAlertsAction implements Executable<msdyn_ParentIoTAlertsResponse> {
  constructor(
    public readonly msdyn_iotalertId: string,
    public readonly parameters: msdyn_ParentIoTAlertsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_iotalerts(${this.msdyn_iotalertId})/Microsoft.Dynamics.CRM.msdyn_ParentIoTAlerts`;

    const body = requestBody({
      TimespanSeconds: this.parameters.TimespanSeconds,
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

  async parseResponse(response: Response): Promise<msdyn_ParentIoTAlertsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ParentIoTAlertsResponse;
    return (await response.json()) as msdyn_ParentIoTAlertsResponse;
  }
}
