import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeEvaluationAction action
 */
export interface msdyn_InvokeEvaluationActionResponse {
  Metadata: string;
  Result: string;
  Status: string;
}

/**
 * Parameters of the msdyn_InvokeEvaluationAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeEvaluationActionActionParameters {
  AdditionalContext?: string;
  ActionType: string;
  ActionPayload: string;
}

/**
 * msdyn_InvokeEvaluationAction action
 *
 * Unbound action
 */
export class msdyn_InvokeEvaluationActionAction implements Executable<msdyn_InvokeEvaluationActionResponse> {
  constructor(public readonly parameters: msdyn_InvokeEvaluationActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeEvaluationAction`;

    const body = requestBody({
      AdditionalContext: this.parameters.AdditionalContext,
      ActionType: this.parameters.ActionType,
      ActionPayload: this.parameters.ActionPayload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeEvaluationActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InvokeEvaluationActionResponse;
    return (await response.json()) as msdyn_InvokeEvaluationActionResponse;
  }
}
