import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PredictionSchema action
 */
export interface PredictionSchemaResponse {
  response: string;
}

/**
 * Parameters of the PredictionSchema action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictionSchemaActionParameters {
  version: string;
  predictionMode?: string;
}

/**
 * PredictionSchema action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictionSchemaAction implements Executable<PredictionSchemaResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: PredictionSchemaActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictionSchema`;

    const body = requestBody({
      version: this.parameters.version,
      predictionMode: this.parameters.predictionMode,
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

  async parseResponse(response: Response): Promise<PredictionSchemaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PredictionSchemaResponse;
    return (await response.json()) as PredictionSchemaResponse;
  }
}
