import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CreateEvaluationRecordsForPlanResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateEvaluationRecordsForPlan action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateEvaluationRecordsForPlanResult {
  "@odata.context"?: string;
  createdEvaluationRecords: string;
}

/**
 * msdyn_CreateEvaluationRecordsForPlan response message
 *
 * `result` is the value the msdyn_CreateEvaluationRecordsForPlan action returns (see {@link msdyn_CreateEvaluationRecordsForPlanResult}).
 */
export class msdyn_CreateEvaluationRecordsForPlanResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEvaluationRecordsForPlanResult) {
    super("msdyn_CreateEvaluationRecordsForPlan");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateEvaluationRecordsForPlanResponse {
    return new msdyn_CreateEvaluationRecordsForPlanResponse(
      data as msdyn_CreateEvaluationRecordsForPlanResult
    );
  }
}
