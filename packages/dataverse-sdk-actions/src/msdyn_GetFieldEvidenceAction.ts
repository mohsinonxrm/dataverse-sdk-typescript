import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFieldEvidence action
 */
export interface msdyn_GetFieldEvidenceResponse {
  msdyn_Evidence: string;
  msdyn_Status: string;
}

/**
 * Parameters of the msdyn_GetFieldEvidence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFieldEvidenceActionParameters {
  msdyn_PreviousDescription?: string;
  msdyn_CorrelationId?: string;
  msdyn_RunId?: string;
  msdyn_aidescriptioncandidate: string;
  msdyn_SimulationId?: string;
}

/**
 * msdyn_GetFieldEvidence action
 *
 * Unbound action
 */
export class msdyn_GetFieldEvidenceAction implements Executable<msdyn_GetFieldEvidenceResponse> {
  constructor(public readonly parameters: msdyn_GetFieldEvidenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFieldEvidence`;

    const body = requestBody({
      msdyn_PreviousDescription: this.parameters.msdyn_PreviousDescription,
      msdyn_CorrelationId: this.parameters.msdyn_CorrelationId,
      msdyn_RunId: this.parameters.msdyn_RunId,
      msdyn_aidescriptioncandidate: this.parameters.msdyn_aidescriptioncandidate,
      msdyn_SimulationId: this.parameters.msdyn_SimulationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetFieldEvidenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFieldEvidenceResponse;
    return (await response.json()) as msdyn_GetFieldEvidenceResponse;
  }
}
