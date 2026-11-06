import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RestoreEvaluationCriteriaResponse as msdyn_RestoreEvaluationCriteriaResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RestoreEvaluationCriteriaResponse.fromResponse({});
    return msdyn_RestoreEvaluationCriteriaResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RestoreEvaluationCriteria response message
 */
export class msdyn_RestoreEvaluationCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_RestoreEvaluationCriteriaResponseData) {
    super("msdyn_RestoreEvaluationCriteria");
  }

  static fromResponse(data: unknown): msdyn_RestoreEvaluationCriteriaResponse {
    return new msdyn_RestoreEvaluationCriteriaResponse(
      responseObject<msdyn_RestoreEvaluationCriteriaResponseData>(data)
    );
  }
}
