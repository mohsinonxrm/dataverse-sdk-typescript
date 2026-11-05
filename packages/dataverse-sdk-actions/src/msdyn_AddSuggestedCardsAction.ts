import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AddSuggestedCards action
 */
export interface msdyn_AddSuggestedCardsResponse {
  // No content returned
}

/**
 * msdyn_AddSuggestedCards action
 *
 * Unbound action
 */
export class msdyn_AddSuggestedCardsAction implements Executable<msdyn_AddSuggestedCardsResponse> {
  constructor(
    public readonly scope: string,
    public readonly businessProcessFlowId: string,
    public readonly businessProcessFlowInstanceId: string,
    public readonly actionStepId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddSuggestedCards`;

    const body: Record<string, unknown> = {
      scope: this.scope,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
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

  async parseResponse(response: Response): Promise<msdyn_AddSuggestedCardsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
