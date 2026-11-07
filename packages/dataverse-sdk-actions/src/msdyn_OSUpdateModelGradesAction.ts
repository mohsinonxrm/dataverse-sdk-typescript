import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OSUpdateModelGrades action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSUpdateModelGradesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OSUpdateModelGradesResponse;
  }
}
