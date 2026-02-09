import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OSUpdateModelGrades request message
 *
 * Web API Action: msdyn_OSUpdateModelGrades
 */
export class msdyn_OSUpdateModelGradesRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSUpdateModelGradesResponse>
{
  constructor(public predictionGrade: string) {
    super("msdyn_OSUpdateModelGrades");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSUpdateModelGrades`;

    const body: Record<string, unknown> = {
      PredictionGrade: this.predictionGrade,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OSUpdateModelGradesResponse> {
    const data = await response.json();
    return msdyn_OSUpdateModelGradesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      PredictionGrade: this.predictionGrade,
    };
  }
}

/**
 * msdyn_OSUpdateModelGrades response message
 */
export class msdyn_OSUpdateModelGradesResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSUpdateModelGradesResponse) {
    super("msdyn_OSUpdateModelGrades");
  }

  static fromResponse(data: unknown): msdyn_OSUpdateModelGradesResponse {
    return new msdyn_OSUpdateModelGradesResponse((data as any).value);
  }
}
