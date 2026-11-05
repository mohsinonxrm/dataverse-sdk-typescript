import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateModelGrades action
 */
export interface msdyn_UpdateModelGradesResponse {
  GradeDefinition: string;
}

/**
 * msdyn_UpdateModelGrades action
 *
 * Unbound action
 */
export class msdyn_UpdateModelGradesAction implements Executable<msdyn_UpdateModelGradesResponse> {
  constructor(public readonly predictionGrade: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateModelGrades`;

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

  async parseResponse(response: Response): Promise<msdyn_UpdateModelGradesResponse> {
    const data = await response.json();
    return data as msdyn_UpdateModelGradesResponse;
  }
}
