import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OSUpdateModelGradesResponse as msdyn_OSUpdateModelGradesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OSUpdateModelGrades message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSUpdateModelGradesRequestParameters {
  PredictionGrade?: string;
}

/**
 * msdyn_OSUpdateModelGrades request message
 *
 * Web API Action: msdyn_OSUpdateModelGrades
 */
export class msdyn_OSUpdateModelGradesRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSUpdateModelGradesResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSUpdateModelGradesRequestParameters>;

  constructor(parameters: msdyn_OSUpdateModelGradesRequestParameters = {}) {
    super("msdyn_OSUpdateModelGrades", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSUpdateModelGrades`;

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

  async parseResponse(response: Response): Promise<msdyn_OSUpdateModelGradesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OSUpdateModelGradesResponse.fromResponse(text ? JSON.parse(text) : {});
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
