import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateModelGrades action
 */
export interface msdyn_UpdateModelGradesResponse {
  GradeDefinition: string;
}

/**
 * Parameters of the msdyn_UpdateModelGrades action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateModelGradesActionParameters {
  PredictionGrade?: string;
}

/**
 * msdyn_UpdateModelGrades action
 *
 * Unbound action
 */
export class msdyn_UpdateModelGradesAction implements Executable<msdyn_UpdateModelGradesResponse> {
  constructor(public readonly parameters: msdyn_UpdateModelGradesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateModelGrades`;

    const body = requestBody({
      PredictionGrade: this.parameters.PredictionGrade,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateModelGradesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateModelGradesResponse;
  }
}
