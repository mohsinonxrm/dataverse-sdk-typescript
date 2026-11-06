import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateEvaluationsForTrigger action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateEvaluationsForTriggerResponse {
  "@odata.context"?: string;
  msdyn_EvaluationIds: string;
}

/**
 * Parameters of the msdyn_CreateEvaluationsForTrigger action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEvaluationsForTriggerActionParameters {
  msdyn_EvaluationTrigger: string;
  msdyn_EntityLogicalName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_CreateEvaluationsForTrigger action
 *
 * Unbound action
 */
export class msdyn_CreateEvaluationsForTriggerAction implements Executable<msdyn_CreateEvaluationsForTriggerResponse> {
  constructor(public readonly parameters: msdyn_CreateEvaluationsForTriggerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEvaluationsForTrigger`;

    const body = requestBody({
      msdyn_EvaluationTrigger: this.parameters.msdyn_EvaluationTrigger,
      msdyn_EntityLogicalName: this.parameters.msdyn_EntityLogicalName,
      msdyn_EntityId: this.parameters.msdyn_EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateEvaluationsForTriggerResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateEvaluationsForTriggerResponse;
  }
}
