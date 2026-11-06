import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SLATimeCalculation action
 */
export interface msdyn_SLATimeCalculationResponse {
  returnValue: string;
  outputLogs: string;
}

/**
 * Parameters of the msdyn_SLATimeCalculation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SLATimeCalculationActionParameters {
  calendarId: string;
  startTime: string;
  requestType: string;
  minutes?: number;
  logsLevel?: number;
  endTime?: string;
}

/**
 * msdyn_SLATimeCalculation action
 *
 * Unbound action
 */
export class msdyn_SLATimeCalculationAction implements Executable<msdyn_SLATimeCalculationResponse> {
  constructor(public readonly parameters: msdyn_SLATimeCalculationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SLATimeCalculation`;

    const body = requestBody({
      calendarId: this.parameters.calendarId,
      startTime: this.parameters.startTime,
      requestType: this.parameters.requestType,
      minutes: this.parameters.minutes,
      logsLevel: this.parameters.logsLevel,
      endTime: this.parameters.endTime,
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

  async parseResponse(response: Response): Promise<msdyn_SLATimeCalculationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SLATimeCalculationResponse;
  }
}
