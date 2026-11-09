import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateModelGradesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateModelGrades action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateModelGradesResult {
  "@odata.context"?: string;
  GradeDefinition: string;
}

/**
 * msdyn_UpdateModelGrades response message
 *
 * `result` is the value the msdyn_UpdateModelGrades action returns (see {@link msdyn_UpdateModelGradesResult}).
 */
export class msdyn_UpdateModelGradesResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateModelGradesResult) {
    super("msdyn_UpdateModelGrades");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateModelGradesResponse {
    return new msdyn_UpdateModelGradesResponse(data as msdyn_UpdateModelGradesResult);
  }
}
