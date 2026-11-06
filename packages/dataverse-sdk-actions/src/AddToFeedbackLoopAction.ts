import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from AddToFeedbackLoop action
 */
export interface AddToFeedbackLoopResponse {
  // No content returned
}

/**
 * Parameters of the AddToFeedbackLoop action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddToFeedbackLoopActionParameters {
  inputName?: string;
  predictionOutput?: string;
  predictionInput: EntityReference | AnyEntityPayload;
}

/**
 * AddToFeedbackLoop action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class AddToFeedbackLoopAction implements Executable<AddToFeedbackLoopResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: AddToFeedbackLoopActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.AddToFeedbackLoop`;

    const body = requestBody({
      inputName: this.parameters.inputName,
      predictionOutput: this.parameters.predictionOutput,
      predictionInput: this.parameters.predictionInput,
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

  async parseResponse(response: Response): Promise<AddToFeedbackLoopResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddToFeedbackLoopResponse;
  }
}
