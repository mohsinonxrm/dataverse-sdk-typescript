import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_OSUpdateModelGradesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OSUpdateModelGrades action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSUpdateModelGradesResult {
  "@odata.context"?: string;
  GradeDefinition: string;
}

/**
 * msdyn_OSUpdateModelGrades response message
 *
 * `result` is the value the msdyn_OSUpdateModelGrades action returns (see {@link msdyn_OSUpdateModelGradesResult}).
 */
export class msdyn_OSUpdateModelGradesResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSUpdateModelGradesResult) {
    super("msdyn_OSUpdateModelGrades");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OSUpdateModelGradesResponse {
    return new msdyn_OSUpdateModelGradesResponse(data as msdyn_OSUpdateModelGradesResult);
  }
}
