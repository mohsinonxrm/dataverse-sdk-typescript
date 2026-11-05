import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action
 */
export interface msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse {
  msdyn_UpdatedSalesAgentRun: string;
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARAction implements Executable<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse> {
  constructor(
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_SalesMacroAgentType: number,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
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
  ): Promise<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse> {
    const data = await response.json();
    return data as msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse;
  }
}
