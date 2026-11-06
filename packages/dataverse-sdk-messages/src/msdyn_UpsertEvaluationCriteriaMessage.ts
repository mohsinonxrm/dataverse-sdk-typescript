import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpsertEvaluationCriteria message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpsertEvaluationCriteriaRequestParameters {
  msydn_UpsertEvaluationCriteriaPayload: string;
}

/**
 * msdyn_UpsertEvaluationCriteria request message
 *
 * Web API Action: msdyn_UpsertEvaluationCriteria
 */
export class msdyn_UpsertEvaluationCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpsertEvaluationCriteriaResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpsertEvaluationCriteriaRequestParameters>;

  constructor(parameters: msdyn_UpsertEvaluationCriteriaRequestParameters) {
    super("msdyn_UpsertEvaluationCriteria", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertEvaluationCriteria`;

    const body = requestBody({
      msydn_UpsertEvaluationCriteriaPayload: this.Parameters.msydn_UpsertEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertEvaluationCriteriaResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpsertEvaluationCriteriaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpsertEvaluationCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpsertEvaluationCriteriaResult {
  "@odata.context"?: string;
  msdyn_UpsertEvaluationCriteriaResponse: string;
}

/**
 * msdyn_UpsertEvaluationCriteria response message
 *
 * `result` is the value the msdyn_UpsertEvaluationCriteria action returns (see {@link msdyn_UpsertEvaluationCriteriaResult}).
 */
export class msdyn_UpsertEvaluationCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpsertEvaluationCriteriaResult) {
    super("msdyn_UpsertEvaluationCriteria");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpsertEvaluationCriteriaResponse {
    return new msdyn_UpsertEvaluationCriteriaResponse(data as msdyn_UpsertEvaluationCriteriaResult);
  }
}
