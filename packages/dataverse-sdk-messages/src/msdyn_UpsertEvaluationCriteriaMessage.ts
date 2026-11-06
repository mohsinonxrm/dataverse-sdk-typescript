import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpsertEvaluationCriteriaResponse as msdyn_UpsertEvaluationCriteriaResponseData } from "./types/index.js";

/**
 * msdyn_UpsertEvaluationCriteria request message
 *
 * Web API Action: msdyn_UpsertEvaluationCriteria
 */
export class msdyn_UpsertEvaluationCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpsertEvaluationCriteriaResponse>
{
  constructor(public msydn_UpsertEvaluationCriteriaPayload: string) {
    super("msdyn_UpsertEvaluationCriteria");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertEvaluationCriteria`;

    const body: Record<string, unknown> = {
      msydn_UpsertEvaluationCriteriaPayload: this.msydn_UpsertEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertEvaluationCriteriaResponse> {
    const data = await response.json();
    return msdyn_UpsertEvaluationCriteriaResponse.fromResponse(data);
  }
}

/**
 * msdyn_UpsertEvaluationCriteria response message
 */
export class msdyn_UpsertEvaluationCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpsertEvaluationCriteriaResponseData) {
    super("msdyn_UpsertEvaluationCriteria");
  }

  static fromResponse(data: unknown): msdyn_UpsertEvaluationCriteriaResponse {
    return new msdyn_UpsertEvaluationCriteriaResponse(
      responseObject<msdyn_UpsertEvaluationCriteriaResponseData>(data)
    );
  }
}
