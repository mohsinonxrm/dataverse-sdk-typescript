import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PredictByReference action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PredictByReferenceResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the PredictByReference action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictByReferenceActionParameters {
  version: string;
  targetRecordId: string;
}

/**
 * PredictByReference action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictByReferenceAction implements Executable<PredictByReferenceResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: PredictByReferenceActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.PredictByReference`;

    const body = requestBody({
      version: this.parameters.version,
      targetRecordId: this.parameters.targetRecordId,
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

  async parseResponse(response: Response): Promise<PredictByReferenceResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PredictByReferenceResponse;
  }
}
