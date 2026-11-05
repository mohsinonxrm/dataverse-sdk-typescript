import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OSUpdateModelGradesResponse as msdyn_OSUpdateModelGradesResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OSUpdateModelGradesResponse> {
    const data = await response.json();
    return msdyn_OSUpdateModelGradesResponse.fromResponse(data);
  }
}

/**
 * msdyn_OSUpdateModelGrades response message
 */
export class msdyn_OSUpdateModelGradesResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSUpdateModelGradesResponseData) {
    super("msdyn_OSUpdateModelGrades");
  }

  static fromResponse(data: unknown): msdyn_OSUpdateModelGradesResponse {
    return new msdyn_OSUpdateModelGradesResponse(
      responseObject<msdyn_OSUpdateModelGradesResponseData>(data)
    );
  }
}
