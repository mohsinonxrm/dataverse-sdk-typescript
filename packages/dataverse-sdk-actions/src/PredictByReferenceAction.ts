import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PredictByReference action
 */
export interface PredictByReferenceResponse {
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
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictByReference`;

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PredictByReferenceResponse;
  }
}
