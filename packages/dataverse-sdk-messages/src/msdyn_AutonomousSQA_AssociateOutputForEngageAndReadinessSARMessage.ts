import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse as msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR response message
 */
export class msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponseData
  ) {
    super("msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSAR");
  }

  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse {
    return new msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse(
      responseObject<msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponseData>(data)
    );
  }
}
