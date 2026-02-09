import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR request message
 *
 * Web API Action: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse>
{
  constructor(
    public msdyn_SalesAgentRun: string,
    public msdyn_SalesMacroAgentType: number,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse> {
    const data = await response.json();
    return msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR response message
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse) {
    super("msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR");
  }

  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse {
    return new msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse(
      (data as any).value
    );
  }
}
