import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SchedulePrediction action
 */
export interface SchedulePredictionResponse {
  response: string;
}

/**
 * SchedulePrediction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class SchedulePredictionAction implements Executable<SchedulePredictionResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly version: string,
    public readonly predictImmediately: boolean,
    public readonly cleanupRequired: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.SchedulePrediction`;

    const body: Record<string, unknown> = {
      version: this.version,
      predictImmediately: this.predictImmediately,
      cleanupRequired: this.cleanupRequired,
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

  async parseResponse(response: Response): Promise<SchedulePredictionResponse> {
    const data = await response.json();
    return data as SchedulePredictionResponse;
  }
}
