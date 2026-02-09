import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfActivityMonitorHasErrorLastSevenDays action
 */
export interface msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfActivityMonitorHasErrorLastSevenDays action
 *
 * Unbound action
 */
export class msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysAction implements Executable<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorHasErrorLastSevenDays`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse;
  }
}
