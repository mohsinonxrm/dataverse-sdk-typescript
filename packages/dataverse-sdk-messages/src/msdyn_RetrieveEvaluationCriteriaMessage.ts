import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveEvaluationCriteriaResponse as msdyn_RetrieveEvaluationCriteriaResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveEvaluationCriteriaResponse.fromResponse(text ? JSON.parse(text) : {});
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
