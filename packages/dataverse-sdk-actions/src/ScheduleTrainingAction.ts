import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ScheduleTraining action
 */
export interface ScheduleTrainingResponse {
  response: string;
}

/**
 * ScheduleTraining action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 */
export class ScheduleTrainingAction implements Executable<ScheduleTrainingResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.ScheduleTraining`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<ScheduleTrainingResponse> {
    const data = await response.json();
    return data as ScheduleTrainingResponse;
  }
}
