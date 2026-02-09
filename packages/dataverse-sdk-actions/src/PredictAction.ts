import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from Predict action
 */
export interface PredictResponse {
  response: string;
  overrideHttpStatusCode: string;
  overrideLocation: string;
  overrideRetryAfter: string;
}

/**
 * Predict action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class PredictAction implements Executable<PredictResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly version: string,
    public readonly request: string,
    public readonly requestv2: EntityReference,
    public readonly source: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.Predict`;

    const body: Record<string, unknown> = {
      version: this.version,
      request: this.request,
      requestv2: this.requestv2,
      source: this.source,
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

  async parseResponse(response: Response): Promise<PredictResponse> {
    const data = await response.json();
    return data as PredictResponse;
  }
}
