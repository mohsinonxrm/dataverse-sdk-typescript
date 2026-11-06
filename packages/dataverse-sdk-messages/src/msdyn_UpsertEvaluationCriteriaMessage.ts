import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpsertEvaluationCriteriaResponse as msdyn_UpsertEvaluationCriteriaResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpsertEvaluationCriteriaResponse.fromResponse({});
    return msdyn_UpsertEvaluationCriteriaResponse.fromResponse(await response.json());
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
