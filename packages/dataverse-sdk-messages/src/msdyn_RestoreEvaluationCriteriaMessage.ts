import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RestoreEvaluationCriteria message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RestoreEvaluationCriteriaRequestParameters {
  msdyn_CriteriaId: string;
  msdyn_CriteriaVersionId: string;
}

/**
 * msdyn_RestoreEvaluationCriteria request message
 *
 * Web API Action: msdyn_RestoreEvaluationCriteria
 */
export class msdyn_RestoreEvaluationCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_RestoreEvaluationCriteriaResponse>
{
  declare readonly Parameters: Readonly<msdyn_RestoreEvaluationCriteriaRequestParameters>;

  constructor(parameters: msdyn_RestoreEvaluationCriteriaRequestParameters) {
    super("msdyn_RestoreEvaluationCriteria", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestoreEvaluationCriteria`;

    const body = requestBody({
      msdyn_CriteriaId: this.Parameters.msdyn_CriteriaId,
      msdyn_CriteriaVersionId: this.Parameters.msdyn_CriteriaVersionId,
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

  async parseResponse(response: Response): Promise<msdyn_RestoreEvaluationCriteriaResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RestoreEvaluationCriteriaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RestoreEvaluationCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RestoreEvaluationCriteriaResult {
  "@odata.context"?: string;
  msdyn_RestoreEvaluationCriteriaResponse: string;
}

/**
 * msdyn_RestoreEvaluationCriteria response message
 *
 * `result` is the value the msdyn_RestoreEvaluationCriteria action returns (see {@link msdyn_RestoreEvaluationCriteriaResult}).
 */
export class msdyn_RestoreEvaluationCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_RestoreEvaluationCriteriaResult) {
    super("msdyn_RestoreEvaluationCriteria");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RestoreEvaluationCriteriaResponse {
    return new msdyn_RestoreEvaluationCriteriaResponse(
      data as msdyn_RestoreEvaluationCriteriaResult
    );
  }
}
