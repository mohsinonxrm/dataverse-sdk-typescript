import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InvokeEvaluationAction action
 */
export interface msdyn_InvokeEvaluationActionResponse {
  Result: string;
  Status: string;
  Metadata: string;
}

/**
 * msdyn_InvokeEvaluationAction action
 *
 * Unbound action
 */
export class msdyn_InvokeEvaluationActionAction implements Executable<msdyn_InvokeEvaluationActionResponse> {
  constructor(
    public readonly additionalContext: string,
    public readonly actionPayload: string,
    public readonly actionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeEvaluationAction`;

    const body: Record<string, unknown> = {
      AdditionalContext: this.additionalContext,
      ActionPayload: this.actionPayload,
      ActionType: this.actionType,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeEvaluationActionResponse> {
    const data = await response.json();
    return data as msdyn_InvokeEvaluationActionResponse;
  }
}
