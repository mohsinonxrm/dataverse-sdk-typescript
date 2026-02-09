import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PredictByReference action
 */
export interface PredictByReferenceResponse {
  response: string;
}

/**
 * PredictByReference action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class PredictByReferenceAction implements Executable<PredictByReferenceResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly version: string,
    public readonly targetRecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictByReference`;

    const body: Record<string, unknown> = {
      version: this.version,
      targetRecordId: this.targetRecordId,
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

  async parseResponse(response: Response): Promise<PredictByReferenceResponse> {
    const data = await response.json();
    return data as PredictByReferenceResponse;
  }
}
