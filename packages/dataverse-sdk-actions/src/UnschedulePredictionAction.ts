import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UnschedulePrediction action
 */
export interface UnschedulePredictionResponse {
  response: string;
}

/**
 * UnschedulePrediction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class UnschedulePredictionAction implements Executable<UnschedulePredictionResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly version: string,
    public readonly skipStatusUpdate: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.UnschedulePrediction`;

    const body: Record<string, unknown> = {
      version: this.version,
      skipStatusUpdate: this.skipStatusUpdate,
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

  async parseResponse(response: Response): Promise<UnschedulePredictionResponse> {
    const data = await response.json();
    return data as UnschedulePredictionResponse;
  }
}
