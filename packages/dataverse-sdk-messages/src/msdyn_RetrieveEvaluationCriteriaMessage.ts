import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveEvaluationCriteria message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEvaluationCriteriaRequestParameters {
  msydn_RetrieveEvaluationCriteriaPayload: string;
}

/**
 * msdyn_RetrieveEvaluationCriteria request message
 *
 * Web API Action: msdyn_RetrieveEvaluationCriteria
 */
export class msdyn_RetrieveEvaluationCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEvaluationCriteriaResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveEvaluationCriteriaRequestParameters>;

  constructor(parameters: msdyn_RetrieveEvaluationCriteriaRequestParameters) {
    super("msdyn_RetrieveEvaluationCriteria", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEvaluationCriteria`;

    const body = requestBody({
      msydn_RetrieveEvaluationCriteriaPayload:
        this.Parameters.msydn_RetrieveEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEvaluationCriteriaResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveEvaluationCriteriaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveEvaluationCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveEvaluationCriteriaResult {
  "@odata.context"?: string;
  msydn_RetrieveEvaluationCriteriaResponse: string;
}

/**
 * msdyn_RetrieveEvaluationCriteria response message
 *
 * `result` is the value the msdyn_RetrieveEvaluationCriteria action returns (see {@link msdyn_RetrieveEvaluationCriteriaResult}).
 */
export class msdyn_RetrieveEvaluationCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEvaluationCriteriaResult) {
    super("msdyn_RetrieveEvaluationCriteria");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveEvaluationCriteriaResponse {
    return new msdyn_RetrieveEvaluationCriteriaResponse(
      data as msdyn_RetrieveEvaluationCriteriaResult
    );
  }
}
