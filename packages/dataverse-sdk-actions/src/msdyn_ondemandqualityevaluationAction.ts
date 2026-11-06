import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ondemandqualityevaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ondemandqualityevaluationResponse {
  "@odata.context"?: string;
  ActionId: string;
  Error: string;
  SkipReason: string;
  Status: string;
}

/**
 * Parameters of the msdyn_ondemandqualityevaluation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ondemandqualityevaluationActionParameters {
  ConversationIds: string[];
  IsBulkEvaluation?: boolean;
  EvaluationPlanId: string;
}

/**
 * msdyn_ondemandqualityevaluation action
 *
 * Unbound action
 */
export class msdyn_ondemandqualityevaluationAction implements Executable<msdyn_ondemandqualityevaluationResponse> {
  constructor(public readonly parameters: msdyn_ondemandqualityevaluationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ondemandqualityevaluation`;

    const body = requestBody({
      ConversationIds: this.parameters.ConversationIds,
      IsBulkEvaluation: this.parameters.IsBulkEvaluation,
      EvaluationPlanId: this.parameters.EvaluationPlanId,
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

  async parseResponse(response: Response): Promise<msdyn_ondemandqualityevaluationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ondemandqualityevaluationResponse;
  }
}
