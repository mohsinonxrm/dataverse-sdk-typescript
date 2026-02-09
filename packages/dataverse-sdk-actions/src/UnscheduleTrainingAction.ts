import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UnscheduleTraining action
 */
export interface UnscheduleTrainingResponse {
  response: string;
}

/**
 * UnscheduleTraining action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 */
export class UnscheduleTrainingAction implements Executable<UnscheduleTrainingResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnscheduleTraining`;

    const body: Record<string, unknown> = {
      version: this.version,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UnscheduleTrainingResponse> {
    const data = await response.json();
    return data as UnscheduleTrainingResponse;
  }
}
