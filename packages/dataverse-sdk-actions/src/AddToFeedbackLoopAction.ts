import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from AddToFeedbackLoop action
 */
export interface AddToFeedbackLoopResponse {
  // No content returned
}

/**
 * AddToFeedbackLoop action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 */
export class AddToFeedbackLoopAction implements Executable<AddToFeedbackLoopResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly inputName: string,
    public readonly predictionOutput: string,
    public readonly predictionInput: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.AddToFeedbackLoop`;

    const body: Record<string, unknown> = {
      inputName: this.inputName,
      predictionOutput: this.predictionOutput,
      predictionInput: this.predictionInput,
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

  async parseResponse(response: Response): Promise<AddToFeedbackLoopResponse> {
    // No return value (204 No Content)
    return {};
  }
}
