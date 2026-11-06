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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckVolumeOfAlertsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckVolumeOfAlertsResponse;
  }
}
