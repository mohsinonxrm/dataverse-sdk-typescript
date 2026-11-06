import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateModelGradesResponse as msdyn_UpdateModelGradesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateModelGrades message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateModelGradesRequestParameters {
  PredictionGrade?: string;
}

/**
 * msdyn_UpdateModelGrades request message
 *
 * Web API Action: msdyn_UpdateModelGrades
 */
export class msdyn_UpdateModelGradesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateModelGradesResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateModelGradesRequestParameters>;

  constructor(parameters: msdyn_UpdateModelGradesRequestParameters = {}) {
    super("msdyn_UpdateModelGrades", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateModelGrades`;

    const body = requestBody({
      PredictionGrade: this.Parameters.PredictionGrade,
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
    return msdyn_UpdateModelGradesResponse.fromResponse(text ? JSON.parse(text) : {});
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
