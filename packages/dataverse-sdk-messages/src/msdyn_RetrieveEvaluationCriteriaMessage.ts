import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveEvaluationCriteriaResponse as msdyn_RetrieveEvaluationCriteriaResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveEvaluationCriteria request message
 *
 * Web API Action: msdyn_RetrieveEvaluationCriteria
 */
export class msdyn_RetrieveEvaluationCriteriaRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEvaluationCriteriaResponse>
{
  constructor(public msydn_RetrieveEvaluationCriteriaPayload: string) {
    super("msdyn_RetrieveEvaluationCriteria");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEvaluationCriteria`;

    const body: Record<string, unknown> = {
      msydn_RetrieveEvaluationCriteriaPayload: this.msydn_RetrieveEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEvaluationCriteriaResponse> {
    const data = await response.json();
    return msdyn_RetrieveEvaluationCriteriaResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveEvaluationCriteria response message
 */
export class msdyn_RetrieveEvaluationCriteriaResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEvaluationCriteriaResponseData) {
    super("msdyn_RetrieveEvaluationCriteria");
  }

  static fromResponse(data: unknown): msdyn_RetrieveEvaluationCriteriaResponse {
    return new msdyn_RetrieveEvaluationCriteriaResponse(
      responseObject<msdyn_RetrieveEvaluationCriteriaResponseData>(data)
    );
  }
}
