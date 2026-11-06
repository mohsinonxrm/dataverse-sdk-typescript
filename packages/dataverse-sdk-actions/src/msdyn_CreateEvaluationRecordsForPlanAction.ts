import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateEvaluationRecordsForPlan action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateEvaluationRecordsForPlanResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateEvaluationRecordsForPlanResponse;
  }
}
