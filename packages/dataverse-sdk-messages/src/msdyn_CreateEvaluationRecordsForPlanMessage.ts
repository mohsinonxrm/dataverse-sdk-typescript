import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateEvaluationRecordsForPlanResponse as msdyn_CreateEvaluationRecordsForPlanResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateEvaluationRecordsForPlan message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEvaluationRecordsForPlanRequestParameters {
  evaluationPlanId: string;
  recordIdsForProcessing: string;
}

/**
 * msdyn_CreateEvaluationRecordsForPlan request message
 *
 * Web API Action: msdyn_CreateEvaluationRecordsForPlan
 */
export class msdyn_CreateEvaluationRecordsForPlanRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateEvaluationRecordsForPlanResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateEvaluationRecordsForPlanRequestParameters>;

  constructor(parameters: msdyn_CreateEvaluationRecordsForPlanRequestParameters) {
    super("msdyn_CreateEvaluationRecordsForPlan", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEvaluationRecordsForPlan`;

    const body = requestBody({
      evaluationPlanId: this.Parameters.evaluationPlanId,
      recordIdsForProcessing: this.Parameters.recordIdsForProcessing,
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

  async parseResponse(response: Response): Promise<msdyn_CreateEvaluationRecordsForPlanResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateEvaluationRecordsForPlanResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CreateEvaluationRecordsForPlan response message
 */
export class msdyn_CreateEvaluationRecordsForPlanResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEvaluationRecordsForPlanResponseData) {
    super("msdyn_CreateEvaluationRecordsForPlan");
  }

  static fromResponse(data: unknown): msdyn_CreateEvaluationRecordsForPlanResponse {
    return new msdyn_CreateEvaluationRecordsForPlanResponse(
      responseObject<msdyn_CreateEvaluationRecordsForPlanResponseData>(data)
    );
  }
}
