import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SLATimeCalculation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SLATimeCalculationResponse {
  "@odata.context"?: string;
  outputLogs: string;
  returnValue: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SLATimeCalculationResponse;
  }
}
