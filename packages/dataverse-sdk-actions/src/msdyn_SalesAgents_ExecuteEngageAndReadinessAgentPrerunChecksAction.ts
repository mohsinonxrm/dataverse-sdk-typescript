import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks action
 */
export interface msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse {
  msdyn_CanExecuteAgent: boolean;
}

/**
 * msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksAction implements Executable<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse> {
  constructor(
    public readonly msdyn_TrackingId?: string,
    public readonly msdyn_SalesAgentRun?: string,
    public readonly msdyn_SalesMacroAgentType?: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse;
  }
}
