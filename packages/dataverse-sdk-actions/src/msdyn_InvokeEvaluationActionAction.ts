import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeEvaluationAction action
 */
export interface msdyn_InvokeEvaluationActionResponse {
  Result: string;
  Status: string;
  Metadata: string;
}

/**
 * Parameters of the msdyn_InvokeEvaluationAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeEvaluationActionActionParameters {
  AdditionalContext?: string;
  ActionPayload: string;
  ActionType: string;
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
      ActionPayload: this.parameters.ActionPayload,
      ActionType: this.parameters.ActionType,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_InvokeEvaluationActionResponse;
  }
}
