import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ScheduleRealTimeScoring action
 */
export interface msdyn_ScheduleRealTimeScoringResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ScheduleRealTimeScoring action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ScheduleRealTimeScoringActionParameters {
  InputData?: string;
}

/**
 * msdyn_ScheduleRealTimeScoring action
 *
 * Unbound action
 */
export class msdyn_ScheduleRealTimeScoringAction implements Executable<msdyn_ScheduleRealTimeScoringResponse> {
  constructor(public readonly parameters: msdyn_ScheduleRealTimeScoringActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScheduleRealTimeScoring`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_ScheduleRealTimeScoringResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ScheduleRealTimeScoringResponse;
  }
}
