import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from BatchPrediction action
 */
export interface BatchPredictionResponse {
  response: string;
}

/**
 * BatchPrediction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class BatchPredictionAction implements Executable<BatchPredictionResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.BatchPrediction`;

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

  async parseResponse(response: Response): Promise<BatchPredictionResponse> {
    const data = await response.json();
    return data as BatchPredictionResponse;
  }
}
