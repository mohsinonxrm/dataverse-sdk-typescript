import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PredictionSchema action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PredictionSchemaResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PredictionSchemaResponse;
  }
}
