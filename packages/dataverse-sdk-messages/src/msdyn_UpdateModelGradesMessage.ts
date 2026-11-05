import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateModelGradesResponse as msdyn_UpdateModelGradesResponseData } from "./types/index.js";

/**
 * msdyn_UpdateModelGrades request message
 *
 * Web API Action: msdyn_UpdateModelGrades
 */
export class msdyn_UpdateModelGradesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateModelGradesResponse>
{
  constructor(public predictionGrade: string) {
    super("msdyn_UpdateModelGrades");
  }

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
    return msdyn_UpdateModelGradesResponse.fromResponse(data);
  }
}

/**
 * msdyn_UpdateModelGrades response message
 */
export class msdyn_UpdateModelGradesResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateModelGradesResponseData) {
    super("msdyn_UpdateModelGrades");
  }

  static fromResponse(data: unknown): msdyn_UpdateModelGradesResponse {
    return new msdyn_UpdateModelGradesResponse(
      responseObject<msdyn_UpdateModelGradesResponseData>(data)
    );
  }
}
