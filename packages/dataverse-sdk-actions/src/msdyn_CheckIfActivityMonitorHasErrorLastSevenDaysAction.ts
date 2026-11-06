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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse;
    return (await response.json()) as msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse;
  }
}
