import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckVolumeOfAlerts action
 */
export interface msdyn_CheckVolumeOfAlertsResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CheckVolumeOfAlerts action
 *
 * Unbound action
 */
export class msdyn_CheckVolumeOfAlertsAction implements Executable<msdyn_CheckVolumeOfAlertsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckVolumeOfAlerts`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckVolumeOfAlertsResponse> {
    const data = await response.json();
    return data as msdyn_CheckVolumeOfAlertsResponse;
  }
}
