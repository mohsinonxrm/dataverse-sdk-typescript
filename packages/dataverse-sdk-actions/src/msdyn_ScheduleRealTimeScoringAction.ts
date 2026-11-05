import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ScheduleRealTimeScoring action
 */
export interface msdyn_ScheduleRealTimeScoringResponse {
  // No content returned
}

/**
 * msdyn_ScheduleRealTimeScoring action
 *
 * Unbound action
 */
export class msdyn_ScheduleRealTimeScoringAction implements Executable<msdyn_ScheduleRealTimeScoringResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScheduleRealTimeScoring`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_ScheduleRealTimeScoringResponse> {
    // No return value (204 No Content)
    return {};
  }
}
