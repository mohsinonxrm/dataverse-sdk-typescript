import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PredictionSchema action
 */
export interface PredictionSchemaResponse {
  response: string;
}

/**
 * PredictionSchema action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class PredictionSchemaAction implements Executable<PredictionSchemaResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly version: string,
    public readonly predictionMode?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictionSchema`;

    const body: Record<string, unknown> = {
      version: this.version,
      predictionMode: this.predictionMode,
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

  async parseResponse(response: Response): Promise<PredictionSchemaResponse> {
    const data = await response.json();
    return data as PredictionSchemaResponse;
  }
}
