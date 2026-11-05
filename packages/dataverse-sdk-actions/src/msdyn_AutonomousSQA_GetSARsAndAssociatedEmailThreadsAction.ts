import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action
 */
export interface msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse {
  msdyn_OrgUrl: string;
  msdyn_response: string;
}

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsAction implements Executable<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse> {
  constructor(
    public readonly msdyn_SalesMacroAgentType: number,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads`;

    const body: Record<string, unknown> = {
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
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
  ): Promise<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse> {
    const data = await response.json();
    return data as msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse;
  }
}
