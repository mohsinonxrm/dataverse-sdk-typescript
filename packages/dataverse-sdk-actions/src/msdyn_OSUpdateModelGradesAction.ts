import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OSUpdateModelGrades action
 */
export interface msdyn_OSUpdateModelGradesResponse {
  GradeDefinition: string;
}

/**
 * Parameters of the msdyn_OSUpdateModelGrades action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSUpdateModelGradesActionParameters {
  PredictionGrade?: string;
}

/**
 * msdyn_OSUpdateModelGrades action
 *
 * Unbound action
 */
export class msdyn_OSUpdateModelGradesAction implements Executable<msdyn_OSUpdateModelGradesResponse> {
  constructor(public readonly parameters: msdyn_OSUpdateModelGradesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSUpdateModelGrades`;

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

  async parseResponse(response: Response): Promise<msdyn_OSUpdateModelGradesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_OSUpdateModelGradesResponse;
  }
}
