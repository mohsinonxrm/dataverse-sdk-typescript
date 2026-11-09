import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GenerateFieldDescriptions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GenerateFieldDescriptionsResponse {
  "@odata.context"?: string;
  msdyn_CandidateValue: string;
  msdyn_Description: string;
  msdyn_Prompt: string;
}

/**
 * Parameters of the msdyn_GenerateFieldDescriptions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateFieldDescriptionsActionParameters {
  msdyn_SimulationId?: string;
  msdyn_CandidateValue: string;
  msdyn_Evidence: string;
  msdyn_RunId?: string;
  msdyn_CorrelationId?: string;
}

/**
 * msdyn_GenerateFieldDescriptions action
 *
 * Unbound action
 */
export class msdyn_GenerateFieldDescriptionsAction implements Executable<msdyn_GenerateFieldDescriptionsResponse> {
  constructor(public readonly parameters: msdyn_GenerateFieldDescriptionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateFieldDescriptions`;

    const body = requestBody({
      msdyn_SimulationId: this.parameters.msdyn_SimulationId,
      msdyn_CandidateValue: this.parameters.msdyn_CandidateValue,
      msdyn_Evidence: this.parameters.msdyn_Evidence,
      msdyn_RunId: this.parameters.msdyn_RunId,
      msdyn_CorrelationId: this.parameters.msdyn_CorrelationId,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateFieldDescriptionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GenerateFieldDescriptionsResponse;
  }
}
