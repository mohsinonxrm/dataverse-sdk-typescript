import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateEvaluationRecordsForPlan action
 */
export interface msdyn_CreateEvaluationRecordsForPlanResponse {
  createdEvaluationRecords: string;
}

/**
 * Parameters of the msdyn_CreateEvaluationRecordsForPlan action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEvaluationRecordsForPlanActionParameters {
  evaluationPlanId: string;
  recordIdsForProcessing: string;
}

/**
 * msdyn_CreateEvaluationRecordsForPlan action
 *
 * Unbound action
 */
export class msdyn_CreateEvaluationRecordsForPlanAction implements Executable<msdyn_CreateEvaluationRecordsForPlanResponse> {
  constructor(public readonly parameters: msdyn_CreateEvaluationRecordsForPlanActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEvaluationRecordsForPlan`;

    const body = requestBody({
      evaluationPlanId: this.parameters.evaluationPlanId,
      recordIdsForProcessing: this.parameters.recordIdsForProcessing,
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
    return (text ? JSON.parse(text) : {}) as msdyn_CreateEvaluationRecordsForPlanResponse;
  }
}
