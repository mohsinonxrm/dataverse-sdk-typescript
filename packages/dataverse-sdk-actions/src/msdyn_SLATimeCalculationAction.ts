import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SLATimeCalculation action
 */
export interface msdyn_SLATimeCalculationResponse {
  returnValue: string;
  outputLogs: string;
}

/**
 * msdyn_SLATimeCalculation action
 *
 * Unbound action
 */
export class msdyn_SLATimeCalculationAction implements Executable<msdyn_SLATimeCalculationResponse> {
  constructor(
    public readonly calendarId: string,
    public readonly startTime: string,
    public readonly requestType: string,
    public readonly minutes?: number,
    public readonly logsLevel?: number,
    public readonly endTime?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLATimeCalculation`;

    const body: Record<string, unknown> = {
      calendarId: this.calendarId,
      startTime: this.startTime,
      requestType: this.requestType,
      minutes: this.minutes,
      logsLevel: this.logsLevel,
      endTime: this.endTime,
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

  async parseResponse(response: Response): Promise<msdyn_SLATimeCalculationResponse> {
    const data = await response.json();
    return data as msdyn_SLATimeCalculationResponse;
  }
}
