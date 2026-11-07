import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UnschedulePrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UnschedulePredictionResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the UnschedulePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnschedulePredictionActionParameters {
  version: string;
  skipStatusUpdate?: boolean;
}

/**
 * UnschedulePrediction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class UnschedulePredictionAction implements Executable<UnschedulePredictionResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: UnschedulePredictionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.UnschedulePrediction`;

    const body = requestBody({
      version: this.parameters.version,
      skipStatusUpdate: this.parameters.skipStatusUpdate,
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

  async parseResponse(response: Response): Promise<UnschedulePredictionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as UnschedulePredictionResponse;
  }
}
