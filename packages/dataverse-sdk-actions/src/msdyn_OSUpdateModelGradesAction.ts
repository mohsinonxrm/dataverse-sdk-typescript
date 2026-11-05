import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSUpdateModelGrades action
 */
export interface msdyn_OSUpdateModelGradesResponse {
  GradeDefinition: string;
}

/**
 * msdyn_OSUpdateModelGrades action
 *
 * Unbound action
 */
export class msdyn_OSUpdateModelGradesAction implements Executable<msdyn_OSUpdateModelGradesResponse> {
  constructor(public readonly predictionGrade: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSUpdateModelGrades`;

    const body: Record<string, unknown> = {
      PredictionGrade: this.predictionGrade,
    };

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
    const data = await response.json();
    return data as msdyn_OSUpdateModelGradesResponse;
  }
}
