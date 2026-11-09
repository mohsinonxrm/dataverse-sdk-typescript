import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfActivityMonitorHasErrorLastSevenDays action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse;
  }
}
