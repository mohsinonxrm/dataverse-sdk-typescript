import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_StoreQualityEvaluationResultResponse as msdyn_StoreQualityEvaluationResultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_StoreQualityEvaluationResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StoreQualityEvaluationResultRequestParameters {
  CriteriaVersionNumber: number;
  EvaluationId: string;
  EvaluationMethod?: number;
  EvaluationInsight?: string;
  Status: string;
}

/**
 * msdyn_StoreQualityEvaluationResult request message
 *
 * Web API Action: msdyn_StoreQualityEvaluationResult
 */
export class msdyn_StoreQualityEvaluationResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_StoreQualityEvaluationResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_StoreQualityEvaluationResultRequestParameters>;

  constructor(parameters: msdyn_StoreQualityEvaluationResultRequestParameters) {
    super("msdyn_StoreQualityEvaluationResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StoreQualityEvaluationResult`;

    const body = requestBody({
      CriteriaVersionNumber: this.Parameters.CriteriaVersionNumber,
      EvaluationId: this.Parameters.EvaluationId,
      EvaluationMethod: this.Parameters.EvaluationMethod,
      EvaluationInsight: this.Parameters.EvaluationInsight,
      Status: this.Parameters.Status,
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

  async parseResponse(response: Response): Promise<msdyn_StoreQualityEvaluationResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_StoreQualityEvaluationResultResponse.fromResponse({});
    return msdyn_StoreQualityEvaluationResultResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_StoreQualityEvaluationResult response message
 */
export class msdyn_StoreQualityEvaluationResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_StoreQualityEvaluationResultResponseData) {
    super("msdyn_StoreQualityEvaluationResult");
  }

  static fromResponse(data: unknown): msdyn_StoreQualityEvaluationResultResponse {
    return new msdyn_StoreQualityEvaluationResultResponse(
      responseObject<msdyn_StoreQualityEvaluationResultResponseData>(data)
    );
  }
}
